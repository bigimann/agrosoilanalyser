import fs from "fs";
import Farmer from "../models/farmer.js";
import cloudinary from "../config/cloudinary.js";

// AI crop recommendation logic
const recommendCrops = (soilType, rainfall, ph) => {
  const crops = [];

  if (soilType === "loamy") {
    crops.push("Maize", "Cassava", "Tomato");
  }

  if (soilType === "clay") {
    crops.push("Rice", "Sugarcane");
  }

  if (soilType === "sandy") {
    crops.push("Groundnut", "Watermelon", "Millet");
  }

  if (rainfall === "high") {
    crops.push("Rice", "Yam");
  }

  if (ph && ph < 6) {
    crops.push("Cassava", "Sweet Potato");
  }

  if (crops.length === 0) {
    crops.push("No strong match — further testing needed");
  }

  return [...new Set(crops)];
};

// CREATE: Analyze and save farmer data
export const analyzeFarmerData = async (req, res) => {
  try {
    const { name, location, soilType, phLevel, rainfallLevel, irrigation } =
      req.body;

    // Input validation
    if (!name || !location) {
      return res.status(400).json({
        success: false,
        error: "Name and location are required",
      });
    }

    if (!soilType || !rainfallLevel) {
      return res.status(400).json({
        success: false,
        error: "Soil type and rainfall level are required",
      });
    }

    // Validate soil type
    const validSoilTypes = ["loamy", "clay", "sandy", "peaty"];
    if (!validSoilTypes.includes(soilType)) {
      return res.status(400).json({
        success: false,
        error: "Invalid soil type",
      });
    }

    // Validate rainfall level
    const validRainfallLevels = ["low", "medium", "high"];
    if (!validRainfallLevels.includes(rainfallLevel)) {
      return res.status(400).json({
        success: false,
        error: "Invalid rainfall level",
      });
    }

    let imageUrl = null;

    // Upload to cloudinary
    if (req.file) {
      try {
        const upload = await cloudinary.uploader.upload(req.file.path, {
          folder: "agrosense-ai",
          resource_type: "auto",
        });

        imageUrl = upload.secure_url;
        fs.unlinkSync(req.file.path);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);

        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }

        return res.status(500).json({
          success: false,
          error: "Failed to upload image",
        });
      }
    }

    // Get crop recommendations
    const recommendedCrops = recommendCrops(
      soilType,
      rainfallLevel,
      parseFloat(phLevel)
    );

    // Save to database
    const farmer = new Farmer({
      name,
      location,
      soilType,
      phLevel: phLevel ? parseFloat(phLevel) : undefined,
      rainfallLevel,
      irrigation: irrigation === "true" || irrigation === true,
      imageUrl,
      recommendedCrops,
    });

    await farmer.save();

    return res.status(201).json({
      success: true,
      data: {
        id: farmer._id,
        imageUrl,
        recommendedCrops,
      },
      metadata: {
        name,
        location,
        soilType,
        phLevel: parseFloat(phLevel) || null,
        rainfallLevel,
        irrigation: irrigation === "true" || irrigation === true,
      },
    });
  } catch (err) {
    console.error("Server error:", err);

    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error("Failed to delete local file:", unlinkError);
      }
    }

    return res.status(500).json({
      success: false,
      error: "Server error occurred",
    });
  }
};

// READ: Get all farmers with pagination and filtering
export const getAllFarmers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (req.query.soilType) {
      filter.soilType = req.query.soilType;
    }
    if (req.query.location) {
      filter.location = { $regex: req.query.location, $options: "i" };
    }
    if (req.query.rainfallLevel) {
      filter.rainfallLevel = req.query.rainfallLevel;
    }

    // Get total count for pagination
    const total = await Farmer.countDocuments(filter);

    // Get farmers with pagination
    const farmers = await Farmer.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return res.status(200).json({
      success: true,
      data: farmers,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Get farmers error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch farmers",
    });
  }
};

// READ: Get single farmer by ID
export const getFarmerById = async (req, res) => {
  try {
    const { id } = req.params;

    const farmer = await Farmer.findById(id).lean();

    if (!farmer) {
      return res.status(404).json({
        success: false,
        error: "Farmer not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: farmer,
    });
  } catch (err) {
    console.error("Get farmer error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch farmer",
    });
  }
};
