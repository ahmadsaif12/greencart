import express from "express";
import { register } from "../controllers/userControllers.js";

const userRoute = express.Router();

userRoute.post("/register", register);

export default userRoute;
