import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Protected routes
router.get("/profile", authenticateToken, getAdminProfile);

export default router;
