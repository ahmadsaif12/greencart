import express from "express";
import { authUser } from "../middleware/authuser.js";
import { 
  getUserOrders, 
  placeOrderCOD, 
  placeOrderStripe, 
  verifyStripe, 
  getSellerOrders 
} from "../controllers/orderControllers.js";

const orderRouter = express.Router();

// --- Customer Routes ---
orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.post("/stripe", authUser, placeOrderStripe); 
orderRouter.post("/verify", authUser, verifyStripe);     
orderRouter.get("/user", authUser, getUserOrders);

// --- Seller Routes ---
// Fixed: Changed from getUserOrders to getSellerOrders
orderRouter.get("/seller", authUser, getSellerOrders); 

export default orderRouter;