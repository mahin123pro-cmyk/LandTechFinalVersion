import dotenv from "dotenv"
dotenv.config();

import { app } from "./app.js";
import mongoose from "mongoose";
import { createClient } from "redis";

const redisUrl=process.env.REDIS_URL;
if(!redisUrl){
    console.log("missing redis url")
    process.exit(1)
}

export const redisClient=createClient({
  url: redisUrl,
});

redisClient.connect().then(()=>console.log("Connected to redis")).catch(console.error)

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

let PORT=process.env.PORT ||5000
app.listen(PORT,"0.0.0.0",async()=>{
    await connectDB()
    console.log("Surver is running successfully")
})





