import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createChceckoutSession, checkoutSuccess } from "../controllers/payment.controllers.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createChceckoutSession);
router.post("/checkout-success", protectRoute, checkoutSuccess);


export default router;