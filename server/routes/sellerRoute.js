// server/routes/sellerRoute.js
import express from "express";
import { sellerLogin, sellerisAuth, sellerLogout } from "../controllers/sellerControllers.js";
import { authSeller } from "../middleware/authseller.js";

const sellerRouter = express.Router();

sellerRouter.post("/login",sellerLogin);
sellerRouter.get("/is-auth",authSeller,sellerisAuth);
sellerRouter.post("/logout",authSeller, sellerLogout);

export default sellerRouter;
