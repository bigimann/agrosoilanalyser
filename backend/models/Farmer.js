import mongoose from "mongoose";

const FarmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  soilType: { type: String, required: true },
  phLevel: { type: Number },
  rainfallLevel: { type: String, required: true },
  irrigation: { type: Boolean, default: false },
  imageUrl: { type: String },
  recommendedCrops: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

// Index for faster queries
FarmerSchema.index({ location: 1, soilType: 1, createdAt: -1 });

export default mongoose.model("Farmer", FarmerSchema);
