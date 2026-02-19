import 'dotenv/config'; 
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Configs
import ConnectDb from "./configs/db.js";
import { connectCloudinary } from "./configs/cloudinary.js";

// Routes
import userRoute from "./routes/userRoute.js";
import sellerRoute from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// 1. Connect to DB & Cloudinary
await ConnectDb();
await connectCloudinary();

// 2. Middleware (CORS MUST come before Routes)
app.use(cors({ 
  origin: ["http://localhost:5173", "http://localhost:5174"], 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// 3. API routes
app.use("/api/user", userRoute);
app.use("/api/seller", sellerRoute);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

// 4. Static Files
app.use(express.static(path.join(__dirname, "../client/dist")));

// 5. Start server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});