import express from "express"
import cors from "cors"
import { deed } from "./routes/deed.route.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { auth } from "./routes/auth.router.js";

const app=express();


app.use(cors({
    origin: [
        "https://vumi-three.vercel.app",
        "http://192.168.0.105:5173",
        "http://localhost:5173",
        
        
        
    ],
    credentials: true
}));

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))



app.use("/api/deed",deed)
app.use("/api/auth",auth)



export {app}