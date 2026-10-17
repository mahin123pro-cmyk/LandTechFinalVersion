import express from "express";
import { login, register, verifyEmail } from "../controllers/Auth.controller.js";
import { profileOne } from "../controllers/profile.js";


const auth=express.Router();


auth.post("/register",register)
auth.post("/otp",verifyEmail)
auth.post("/login",login)

auth.get("/profile",profileOne)

export{auth}