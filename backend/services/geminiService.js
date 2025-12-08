import { GoogleGenAI } from "@google/genai";

// Initialize Gemini with API key
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const getAICropRecommendations = async (farmerData) => {
  try {
    const { soilType, rainfallLevel, phLevel, location, irrigation } =
      farmerData;

    // Build context-rich prompt
    const prompt = `You are an expert agricultural advisor specializing in crop recommendations for farmers in Africa, particularly Nigeria, who also has access to verified agricultural data on the internet for accurate prediction.

Analyze the following farm data and provide intelligent crop recommendations:

Farm Location: ${location}
Soil Type: ${soilType}
Soil pH Level: ${phLevel || "Not provided"}
Rainfall Level: ${rainfallLevel}
Irrigation Available: ${irrigation ? "Yes" : "No"}

Based on this data, please:
1. Recommend 5-8 suitable crops that will thrive in these conditions
2. Consider the local climate and market demand in ${location}
3. Prioritize crops that match the soil type and water availability
4. Include a mix of staple crops, cash crops, and vegetables where appropriate

Respond ONLY with a JSON object in this exact format (no markdown, no explanation, no code blocks):
{
  "recommendedCrops": ["Crop1", "Crop2", "Crop3", "Crop4", "Crop5"],
  "reasoning": "Brief explanation of why these crops were chosen based on the soil and climate conditions",
  "priority": "The single most recommended crop for maximum yield",
  "tips": ["Practical farming tip 1", "Practical farming tip 2", "Practical farming tip 3"]
}`;

    // Use Gemini Pro model
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      generationConfig: {
        temperature: 0.7, // Balance between creativity and consistency
        maxOutputTokens: 800,
      },
    });

    console.log("🤖 Requesting Gemini AI predictions...");

    let text = result.text;

    console.log("✅ Gemini AI response received");

    // Clean up response (remove markdown code blocks if present)
    text = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    // Parse JSON response
    const aiResponse = JSON.parse(text);

    return {
      success: true,
      recommendations: aiResponse.recommendedCrops || [],
      reasoning: aiResponse.reasoning || "",
      priority: aiResponse.priority || "",
      tips: aiResponse.tips || [],
    };
  } catch (error) {
    console.error("❌ Gemini AI Error:", error.message);

    // Fallback to rule-based recommendations if AI fails
    return {
      success: false,
      error: "AI service unavailable",
      recommendations: getFallbackRecommendations(farmerData),
      reasoning:
        "Using rule-based recommendations due to AI service unavailability",
      priority: null,
      tips: [
        "Ensure proper soil preparation before planting",
        "Use organic fertilizers for better soil health",
        "Monitor weather patterns for optimal planting time",
      ],
    };
  }
};

// Fallback recommendations (your original logic)
const getFallbackRecommendations = (farmerData) => {
  const { soilType, rainfallLevel, phLevel } = farmerData;
  const crops = [];

  if (soilType === "loamy") {
    crops.push("Maize", "Cassava", "Tomato", "Beans");
  }
  if (soilType === "clay") {
    crops.push("Rice", "Sugarcane", "Yam");
  }
  if (soilType === "sandy") {
    crops.push("Groundnut", "Watermelon", "Millet", "Sweet Potato");
  }
  if (soilType === "peaty") {
    crops.push("Vegetables", "Root Crops", "Rice");
  }
  if (rainfallLevel === "high") {
    crops.push("Rice", "Yam", "Cocoyam");
  }
  if (rainfallLevel === "low") {
    crops.push("Millet", "Sorghum", "Cowpea");
  }
  if (phLevel && phLevel < 6) {
    crops.push("Cassava", "Sweet Potato", "Irish Potato");
  }
  if (phLevel && phLevel > 7) {
    crops.push("Sorghum", "Barley");
  }

  // Default crops if nothing matches
  if (crops.length === 0) {
    crops.push("Cassava", "Maize", "Beans", "Yam");
  }

  // Remove duplicates and return
  return [...new Set(crops)];
};
