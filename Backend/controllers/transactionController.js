import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";
const { Types } = mongoose;

// create
export const addTransaction = async (req, res) => {
  try {
    const { category = "Uncategorized", amount, type, date } = req.body;

    if (amount === undefined || type === undefined) return res.status(400).json({ message: "Amount and type are required" });
    const numeric = Number(amount);
    if (Number.isNaN(numeric)) return res.status(400).json({ message: "Amount must be a number" });

    const txn = await Transaction.create({
      userId: req.user.id,
      category,
      amount: numeric,
      type,
      date: date ? new Date(date) : new Date()
    });
    return res.status(201).json(txn);
  } catch (err) {
    console.error("ADD TXN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// read all
export const getTransactions = async (req, res) => {
  try {
    const txns = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
    return res.json(txns);
  } catch (err) {
    console.error("GET TXN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// update
export const updateTransaction = async (req, res) => {
  try {
    if (req.body.amount !== undefined) {
      const numeric = Number(req.body.amount);
      if (Number.isNaN(numeric)) return res.status(400).json({ message: "Amount must be a number" });
      req.body.amount = numeric;
    }
    if (req.body.date) req.body.date = new Date(req.body.date);

    const txn = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!txn) return res.status(404).json({ message: "Transaction not found" });
    return res.json(txn);
  } catch (err) {
    console.error("UPDATE TXN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// delete
export const deleteTransaction = async (req, res) => {
  try {
    const removed = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!removed) return res.status(404).json({ message: "Transaction not found" });
    return res.json({ message: "Deleted", id: removed._id });
  } catch (err) {
    console.error("DELETE TXN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// summary (includes byCategory, byMonth, daily, totals)
export const transactionsSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const objectId = new Types.ObjectId(userId);

    // totals
    const totalIncomeResult = await Transaction.aggregate([
      { $match: { userId: objectId, type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalExpenseResult = await Transaction.aggregate([
      { $match: { userId: objectId, type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalIncome = totalIncomeResult[0]?.total || 0;
    const totalExpense = totalExpenseResult[0]?.total || 0;

    // byCategory (sum of expenses by category)
    const byCategoryAgg = await Transaction.aggregate([
      { $match: { userId: objectId, type: "expense" } },
      {
        $group: {
          _id: { $ifNull: ["$category", "Uncategorized"] },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { total: -1 } }
    ]);
    // normalize shape: { _id: "Food", total: 100 }
    const byCategory = byCategoryAgg.map((c) => ({ _id: c._id, total: c.total }));

    // byMonth
    const byMonth = await Transaction.aggregate([
      { $match: { userId: objectId } },
      {
        $addFields: {
          yearMonth: { $dateToString: { format: "%Y-%m", date: "$date" } }
        }
      },
      {
        $group: {
          _id: "$yearMonth",
          income: { $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] } },
          expense: { $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // daily (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const daily = await Transaction.aggregate([
      { $match: { userId: objectId, date: { $gte: thirtyDaysAgo } } },
      {
        $addFields: {
          day: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
        }
      },
      {
        $group: {
          _id: "$day",
          totalExpense: { $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] } },
          totalIncome: { $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return res.json({ totalIncome, totalExpense, byCategory, byMonth, daily });
  } catch (err) {
    console.error("SUMMARY ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};