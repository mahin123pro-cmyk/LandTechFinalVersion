import jwt from "jsonwebtoken"

import otpModel from "../models/otp.model.js";
import sessionModel from "../models/session.model.js";
import { userModel } from "../models/User.model.js";
import { generateOtp, getOtpHtml } from "../utils/email.js";
import { sendEmail } from "../utils/sendMail.js";



export async function register(req, res) {

    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({email})

    if (isAlreadyRegistered) {
      return  res.status(409).json({
            message: "Email already exists"
        })
    }

    // const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    const user = await userModel.create({
        username,
        email,
        password
        //  hashedPassword
    })

    const otp = generateOtp();
    const html = getOtpHtml(otp);

    // const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    await otpModel.create({
        email,
        user: user._id,
       otp
    })

    await sendEmail({email, subject:"OTP Verification",html})

   return res.status(201).json({
        message: "User registered successfully",
        user: {
            username: user.username,
            email: user.email,
            verified: user.verified
        },
    })


}






export async function verifyEmail(req, res) {
    const { otp, email } = req.body

    // const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    const otpDoc = await otpModel.findOne({
        email,
        otp
    })

    if (!otpDoc) {
        return res.status(400).json({
            message: "Invalid OTP"
        })
    }

    const user = await userModel.findByIdAndUpdate(otpDoc.user, {
        verified: true
    })

    await otpModel.deleteMany({
        user: otpDoc.user
    })

    return res.status(200).json({
        message: "Email verified successfully",
        user: {
            username: user.username,
            email: user.email,
            verified: user.verified
        }
    })
}




export async function login(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    if (!user.verified) {
        return res.status(401).json({
            message: "Email not verified"
        })
    }

    // const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const refreshToken = jwt.sign({
        id: user._id,
        role:user.role
    }, process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )

 
    res.status(200).json({
        message: "Logged in successfully",
        user: {
            username: user.username,
            email: user.email,
        },
       refreshToken
    })
}








export async function getMe(req, res) {

    const token = req.headers.authorization?.split(" ")[ 1 ];

    if (!token) {
        return res.status(401).json({
            message: "token not found"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)

    res.status(200).json({
        message: "user fetched successfully",
        user: {
            username: user.username,
            email: user.email,
        }
    })

}





export async function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token not found"
        })
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)

    
    const session = await sessionModel.findOne({
        refreshToken,
        revoked: false
    })

    if (!session) {
        return res.status(401).json({
            message: "Invalid refresh token"
        })
    }


    const accessToken = jwt.sign({
        id: decoded.id
    }, process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    )

    const newRefreshToken = jwt.sign({
        id: decoded.id
    }, process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )

    // const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex");

    session.refreshToken = newRefreshToken;
    await session.save();

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(200).json({
        message: "Access token refreshed successfully",
        accessToken
    })
}












export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!accessToken) {
      return res.status(401).json({
        message: "Access token required",
      });
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    );

    if (!decoded.id || !decoded.sessionId) {
      return res.status(401).json({
        message: "Invalid access token",
      });
    }

    const session = await sessionModel.findOne({
      _id: decoded.sessionId,
      user: decoded.id,
      revoked: false,
    });

    if (!session) {
      return res.status(401).json({
        message: "Session is invalid or revoked",
      });
    }

    req.user = {
      id: decoded.id,
      sessionId: decoded.sessionId,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid or expired access token",
      });
    }

    next(error);
  }
}
