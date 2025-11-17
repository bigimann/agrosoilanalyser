import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });
};

// Register new admin
export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide username, email, and password",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters",
      });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { username }],
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        error: "Admin with this email or username already exists",
      });
    }

    // Create new admin
    const admin = new Admin({
      username,
      email,
      password, // Will be hashed by pre-save hook
    });

    await admin.save();

    // Generate token
    const token = generateToken(admin._id);

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({
      success: false,
      error: "Registration failed",
    });
  }
};

// Login admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide email and password",
      });
    }

    // Find admin
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken(admin._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      error: "Login failed",
    });
  }
};

// Get current admin profile
export const getAdminProfile = async (req, res) => {
  try {
    // req.admin is set by authenticateToken middleware
    return res.status(200).json({
      success: true,
      admin: req.admin,
    });
  } catch (err) {
    console.error("Get profile error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to get profile",
    });
  }
};
