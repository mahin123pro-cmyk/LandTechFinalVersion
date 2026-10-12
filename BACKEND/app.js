import express from "express"
import cors from "cors"
import { deed } from "./routes/deed.route.js";
import morgan from "morgan";
const app=express();



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))
app.use(cors({
    origin:[
        "http://192.168.0.105:5173",
        "http://localhost:5173"
        
    ],credentials:true
}))


app.use("/api/deed",deed)




export {app}