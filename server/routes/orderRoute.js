import express from "express";
import { isAuth } from "../controllers/userControllers.js";
import { getUserOrders, placeOrderCOD } from "../controllers/orderControllers.js";

const orderRouter = express.Router();

orderRouter.post("/code", isAuth, placeOrderCOD);
orderRouter.get("/user",isAuth,getUserOrders)
orderRouter.get("/seller",isAuth,getUserOrders)

export default orderRouter;
