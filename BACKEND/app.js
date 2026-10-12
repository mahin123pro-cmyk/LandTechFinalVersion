import express from "express"
import cors from "cors"
import { deed } from "./routes/deed.route.js";
import morgan from "morgan";
const app=express();



app.use(cors({
    origin: 
        "https://vumi-three.vercel.app"
    ,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))



app.use("/api/deed",deed)




export {app}