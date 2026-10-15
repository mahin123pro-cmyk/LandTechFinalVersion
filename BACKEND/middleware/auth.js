import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const header = req.headers.authorization;





          if (!header?.startsWith("Bearer ")) {
            return res.status(401).json({
              message: "Access token required",
              });
    }






    const token = header.split(" ")[1];

           const decoded = jwt.verify(
             token,
             process.env.ACCESS_TOKEN_SECRET
     );





    req.user = {
            id: decoded.id,
            role: decoded.role,
      };




           next();
  } catch {
           return res.status(401).json({
         message: "Invalid or expired access token",
    });
     }
};






export const adminOnly = (req, res, next) => {
         if (req.user?.role !== "admin") {
           return res.status(403).json({
      message: "Admin access only",
    });
  }

         next();
};