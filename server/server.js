import express from "express"
import cookieParser from "cookie-parser";
import cors from 'cors'
import ConnectDb from "./configs/db.js";
import 'dotenv/config';
import userRoute from "./routes/userRoute.js";
import sellerRoute from "./routes/sellerRoute.js";
import { connectCloudinary } from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";

const app=express()
const port=process.env.PORT || 5000;

await ConnectDb()
await connectCloudinary()

//allowed multiple origins
const allowedOrigins=['http://localhost:5173']

//  middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigins,credentials:true}))

app.get("/",(req,res)=>{
    res.send("Api is working on")
});
app.use("/api/user",userRoute);
app.use("/api/seller",sellerRoute)
app.use("/api/product",productRouter)


app.listen(port,()=>{
    console.log(`Sever is listening on http://localhost:${port}`)
});