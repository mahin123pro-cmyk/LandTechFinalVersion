import dotenv from "dotenv"
dotenv.config();

import { app } from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;

const connectDB=async()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGODB_URI)
        if(connect){
            console.log("Mongo DB is connected Successfully")
            
        }
    }catch(error){
        console.log(error.message)
    }
}


app.listen(PORT,async()=>{
    await connectDB()
    console.log("Surver is running successfully")
})





