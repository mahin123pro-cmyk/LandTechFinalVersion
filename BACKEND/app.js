import express from "express"
import cors from "cors"
import { deed } from "./routes/deed.route.js";
const app=express();


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use("/api/deed",deed)



export {app}