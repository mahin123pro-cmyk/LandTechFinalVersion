import { deedModel } from "../models/deedModel.js"

export const allId=async(req,res)=>{
  const allid=await deedModel.find({}).select("deedId")
  res.status(200).json({message:allid})
}

