import express from "express";
import { newdeedGenerate } from "../controllers/NewDeedGenerate.conreoller.js";
import { deedtransfer } from "../controllers/DeedTransfer.js";
import { deedVerification } from "../controllers/Verification.controller.js";
import { allId } from "../controllers/allid.js";
import { deedDetails } from "../controllers/deedDetails.js";
// import { register, verification } from "../controllers/Register.controller.js";

const deed=express.Router();


deed.post("/newdeedgenerate",newdeedGenerate)
deed.post("/transfer",deedtransfer);
deed.post("/verification",deedVerification)

deed.get("/allid",allId);
deed.post("/verification/:id",deedDetails)

// deed.post("/register",register)
// deed.post("/verify/:token",verification)



export{deed}