import { deedModel } from "../models/deedModel.js";

export const deedDetails=async(req,res)=>{
    try{
const {id}=req.params;
  const details=await deedModel.findOne({deedId:id});
  if(!details){
    res.status(400).json({
        message:"Deed not found"
    })
  }

  res.status(200).json({
    message:details
  })
    }catch(error){
       res.status(400).json({
        message:error.message
       })
    }
}
