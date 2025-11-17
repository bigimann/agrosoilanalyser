import * as dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import fs from "fs";
import { promises as fsPromises } from "fs";
import mongoose from "mongoose";
import farmerRoute from "./routes/farmerRoute.js";
import authRoute from "./routes/authRoute.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Ensure uploads directory exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

console.log("Cloudinary key:", process.env.CLOUDINARY_API_KEY);

// Cleanup on startup
const cleanupUploads = async () => {
  try {
    const files = await fsPromises.readdir("./uploads");
    for (const file of files) {
      if (file !== ".gitkeep") {
        await fsPromises.unlink(`./uploads/${file}`);
      }
    }
    console.log("✅ Cleaned up uploads directory");
  } catch (err) {
    console.error("⚠️ Cleanup error:", err);
  }
};

cleanupUploads();

// Routes
app.use("/api/auth", authRoute);
app.use("/api/farmers", farmerRoute);

app.get("/", (req, res) => {
  res.json({
    message: "AgroSense-AI Backend Running",
    status: "active",
    version: "1.0.0",
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📂 Uploads directory: ${uploadDir}`);
});
