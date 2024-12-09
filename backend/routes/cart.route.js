import express from "express";
import { addToCart, getCart, removeAllProducts, updateProductQuantity } from "../controllers/cart.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getCart); 
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, removeAllProducts);
router.put("/:id", protectRoute, updateProductQuantity);

export default router;
