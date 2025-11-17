import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const authenticateToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get admin from database
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        error: "Invalid token. Admin not found.",
      });
    }

    // Attach admin to request
    req.admin = admin;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        error: "Invalid token.",
      });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Token expired.",
      });
    }
    return res.status(500).json({
      success: false,
      error: "Authentication failed.",
    });
  }
};
