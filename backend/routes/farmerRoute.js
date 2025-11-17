import express from "express";
import multer from "multer";
import path from "path";
import {
  analyzeFarmerData,
  getAllFarmers,
  getFarmerById,
} from "../controllers/farmerController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});

// PUBLIC: Submit farmer data (no auth required)
router.post(
  "/",
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            error: "File size too large. Maximum 5MB allowed.",
          });
        }
        return res.status(400).json({
          success: false,
          error: err.message,
        });
      } else if (err) {
        return res.status(400).json({
          success: false,
          error: err.message,
        });
      }
      next();
    });
  },
  analyzeFarmerData
);

// PROTECTED: Admin routes (authentication required)
router.get("/", authenticateToken, getAllFarmers);
router.get("/:id", authenticateToken, getFarmerById);

export default router;
