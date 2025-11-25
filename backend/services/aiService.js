import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const getAICropRecommendations = async (farmerData) => {
  try {
    const { soilType, rainfallLevel, phLevel, location, irrigation } =
      farmerData;

    // Build context-rich prompt
    const prompt = `You are an expert agricultural advisor specializing in crop recommendations for farmers in Africa, particularly Nigeria.

Analyze the following farm data and provide intelligent crop recommendations:

Farm Location: ${location}
Soil Type: ${soilType}
Soil pH Level: ${phLevel || "Not provided"}
Rainfall Level: ${rainfallLevel}
Irrigation Available: ${irrigation ? "Yes" : "No"}

Based on this data, please:
1. Recommend 3-5 suitable crops that will thrive in these conditions
2. Consider the local climate and market demand in ${location}
3. Prioritize crops that match the soil type and water availability
4. Include a mix of staple crops, cash crops, and vegetables where appropriate

Respond ONLY with a JSON object in this exact format (no markdown, no explanation):
{
  "recommendedCrops": ["Crop1", "Crop2", "Crop3", ...],
  "reasoning": "Brief explanation of why these crops were chosen",
  "priority": "The single most recommended crop",
  "tips": ["Tip 1", "Tip 2", "Tip 3"]
}`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract the text response
    const responseText = message.content[0].text;

    // Parse JSON response
    const aiResponse = JSON.parse(responseText);

    return {
      success: true,
      recommendations: aiResponse.recommendedCrops || [],
      reasoning: aiResponse.reasoning || "",
      priority: aiResponse.priority || "",
      tips: aiResponse.tips || [],
    };
  } catch (error) {
    console.error("AI Prediction Error:", error);

    // Fallback to basic recommendations if AI fails
    return {
      success: false,
      error: "AI service unavailable",
      recommendations: getFallbackRecommendations(farmerData),
      reasoning:
        "AI service temporary unavailable, Please try again for accurate recommendations!",
      priority: null,
      tips: [],
    };
  }
};

// Fallback function (your original logic)
const getFallbackRecommendations = (farmerData) => {
  const { soilType, rainfallLevel, phLevel } = farmerData;
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
  if (rainfallLevel === "high") {
    crops.push("Rice", "Yam");
  }
  if (phLevel && phLevel < 6) {
    crops.push("Cassava", "Sweet Potato");
  }
  if (crops.length === 0) {
    crops.push("Cassava", "Maize", "Beans");
  }

  return [...new Set(crops)];
};
