import express from "express";
import { registerUser, loginUser, updateBudget } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/budget", authMiddleware, updateBudget);

export default router;