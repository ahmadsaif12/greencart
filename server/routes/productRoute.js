import express from "express";
import { upload } from "../configs/multer.js";
import { authSeller } from "../middleware/authseller.js";
import { addProduct, changeStock, productById, productList } from "../controllers/productControllers.js";

const productRouter = express.Router();

// Add product with multiple images (field name: 'images')
productRouter.post("/add", upload.array("images"), authSeller, addProduct);

// List all products
productRouter.get("/list", productList);

// Get product by ID
productRouter.get("/id", productById);

// Change stock of a product
productRouter.post("/stock", authSeller, changeStock);

export default productRouter;