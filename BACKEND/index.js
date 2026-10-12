import dotenv from "dotenv"
dotenv.config();

import { app } from "./app.js";
import mongoose from "mongoose";



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


app.listen(3000,"0.0.0.0",async()=>{
    await connectDB()
    console.log("Surver is running successfully")
})





