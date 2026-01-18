import express from "express";
import { isAuth } from "../controllers/userControllers.js";
import { addAddress ,getAddress} from "../controllers/addressControllers.js";

const addressRouter = express.Router();

addressRouter.post("/add", isAuth, addAddress);
addressRouter.get("/get",isAuth,getAddress)

export default addressRouter;