import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const makeSafeUser = (userDoc) => {
  if (!userDoc) return null;
  return { _id: userDoc._id, name: userDoc.name, email: userDoc.email, budget: userDoc.budget };
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    const safeUser = makeSafeUser(user);
    return res.status(201).json({ message: "User created", user: safeUser });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not set in environment");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
    const safeUser = makeSafeUser(user);

    return res.json({ user: safeUser, token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { budget } = req.body;

    if (budget === undefined || budget === null) {
      return res.status(400).json({ error: "Budget is required" });
    }

    const numericBudget = Number(budget);
    if (Number.isNaN(numericBudget)) return res.status(400).json({ error: "Invalid budget value" });

    const updated = await User.findByIdAndUpdate(userId, { budget: numericBudget }, { new: true }).select("-password");
    if (!updated) return res.status(404).json({ error: "User not found" });

    return res.json({ user: { _id: updated._id, name: updated.name, email: updated.email, budget: updated.budget } });
  } catch (err) {
    console.error("Update budget error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};