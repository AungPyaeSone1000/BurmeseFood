import express from "express";
import { login, logout, singup } from "../controllers/auth.controllers.js";

const router = express.Router();

router.get("/signup", singup);
router.get("/login", login);
router.get("/logout", logout);

export default router;
