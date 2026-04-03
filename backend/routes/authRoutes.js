// routes/authRoutes.js

import express from "express";
import { registerUser, verifyOTP } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verifyOTP);

export default router;