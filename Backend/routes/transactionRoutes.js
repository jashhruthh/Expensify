import express from "express";
import {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  transactionsSummary
} from "../controllers/transactionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/summary", authMiddleware, transactionsSummary);
router.post("/", authMiddleware, addTransaction);
router.get("/", authMiddleware, getTransactions);
router.put("/:id", authMiddleware, updateTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);

export default router;