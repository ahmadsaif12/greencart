import express from "express";
import { isAuth } from "../controllers/userControllers.js";
import { updateCart } from "../controllers/cartControllers.js";

const cartRouter = express.Router();

cartRouter.post("/update", isAuth, updateCart);

export default cartRouter;
