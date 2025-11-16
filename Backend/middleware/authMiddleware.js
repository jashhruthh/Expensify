import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const header = req.header("Authorization") || req.header("authorization");
    let token = null;

    if (header) {
      token = header.startsWith("Bearer ") ? header.slice(7).trim() : header.trim();
    }

    if (!token) return res.status(401).json({ message: "No token provided" });

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not set in environment");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id || decoded._id || decoded.userId;
    if (!userId) return res.status(401).json({ message: "Invalid token payload" });

    req.user = { id: userId };

    return next();
  } catch (err) {
    console.error("AUTH MIDDLEWARE ERROR:", err.message || err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;