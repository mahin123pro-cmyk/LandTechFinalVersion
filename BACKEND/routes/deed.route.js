import express from "express";
import { newdeedGenerate } from "../controllers/NewDeedGenerate.conreoller.js";

const deed=express.Router();


deed.post("/newdeedGenerate",newdeedGenerate)


export{deed}