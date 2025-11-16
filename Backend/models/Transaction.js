import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, default: "Uncategorized" },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    date: { type: Date, required: true, default: Date.now }
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;