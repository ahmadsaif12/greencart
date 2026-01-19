import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import ConnectDb from "./configs/db.js";
import 'dotenv/config';
import userRoute from "./routes/userRoute.js";
import sellerRoute from "./routes/sellerRoute.js";
import { connectCloudinary } from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Connect to DB & Cloudinary
await ConnectDb();
await connectCloudinary();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// API routes
app.use("/api/user", userRoute);
app.use("/api/seller", sellerRoute);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);


app.use(express.static(path.join(__dirname, "../client/dist")));

// Start server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
