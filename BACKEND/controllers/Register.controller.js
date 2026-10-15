// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// import sanitize from "mongo-sanitize";
// import { registerZodSchema } from "../utils/zod.js";
// import { redisClient } from "../index.js";
// import { userModel } from "../models/User.model.js";
// import crypto from "crypto"
// import { sendMail } from "../utils/sendMail.js";
// import { verifyEmail } from "../utils/email.js";

// export const register = async (req, res) => {
//   try {
//     const sanitizeBody = sanitize(req.body);
//     const validation = registerZodSchema.safeParse(sanitizeBody);
//     if (!validation.success) {
//       const zodError = validation.error;
//       let firstErrorMessage = "Validation Failed";
//       let allErrors = [];
//       if (zodError?.issues && Array.isArray(zodError.issues)) {
//         allErrors = zodError.issues.map((issue) => ({
//           field: issue.path ? issue.path.join(".") : "unknown",
//           message: issue.message || "Validation Error",
//           code: issue.code
//         }))
//         firstErrorMessage = allErrors[0]?.message || "Validation error"
//       }
//    return res.status(400).json({
//       message: firstErrorMessage,
//       error: allErrors
//     })
//     }

//  const { username, email, password } = validation.data;
//     const ratelimitkey = `register-rate-limit:${req.ip}:${email}`
//     if (await redisClient.get(ratelimitkey)) {
//       return res.status(429).json({
//         message: "Too many request. Try again later"
//       })
//     }
//     const existingUser=await userModel.findOne({email:email})
//     if(existingUser){
//       return res.status(400).json({message:"User already exists"})
//     }
//     const hashPassword=await bcrypt.hash(password,10);
//     const verifytoken=crypto.randomBytes(32).toString("hex");
//     const verifyKey=`verify:${verifytoken}`;
//     const datatoStore=JSON.stringify({username,email,password:hashPassword});
//     await redisClient.set(verifyKey,datatoStore,{EX:300})
//     const subject="Verify your Email";
//     const html=verifyEmail({email,token:verifytoken})
//    await sendMail({email,subject,html})
// res.status(200).json({
//   message:"Send Email Successfully"
// })

//   } catch (error) {
//     res.status(400).json({
//       message: error.message
//     })
//   }


// };


// export const verification=async(req,res)=>{
//   try{
// const {token}=req.params;
// if(!token){
//   return res.status(400).json({message:"Verification token is required"})
// }
// const verifyKey=`verify:${token}`;
// const userDataJson=await redisClient.get(verifyKey)
// if(!userDataJson){
//   return res.status(400).json({message:"Verification token is expired"})
// }

// await redisClient.del(verifyKey)
// const userData=JSON.parse(userDataJson)

//  const existingUser=await userModel.findOne({email:userData.email})
//     if(existingUser){
//       return res.status(400).json({message:"User already exists"})
//     }

//     const newUser=await userModel.create({
//       username:userData.username,
//       email:userData.email,
//       password:userData.password

//     })

//     res.status(201).json({
//       message:"Email verified successfully",
//       user:{_id:newUser._id,name:newUser.name,email:newUser.email}
//     })

//   }catch(error){


//      res.status(400).json({
//       message: error.message
//   })
// }}