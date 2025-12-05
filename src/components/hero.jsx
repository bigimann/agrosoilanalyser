import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
            🤖 AI-Powered Agriculture
          </div>
          <h1 className="text-4xl md:text-4xl font-bold text-gray-900 leading-tight">
            Smart Crop Recommendations for
            <span className="text-green-600"> African Farmers</span>
          </h1>
          <p className="text-xl text-gray-600">
            Get personalized, AI-driven crop recommendations based on your soil
            type, climate, and location. Make informed decisions for better
            yields.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/form")}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105"
            >
              Start Analysis →
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("how-it-works")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div>
              <div className="text-3xl font-bold text-green-600">1000+</div>
              <div className="text-gray-600 text-sm">Farmers Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">95%</div>
              <div className="text-gray-600 text-sm">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">50+</div>
              <div className="text-gray-600 text-sm">Crop Types</div>
            </div>
          </div>
        </div>

        {/* Hero Image/Animation */}
        <div className="relative">
          <div className="bg-linear-to-br from-green-400 to-emerald-600 rounded-3xl p-8 transform rotate-3 shadow-2xl">
            <div className="bg-white rounded-2xl p-6 transform -rotate-3">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop"
                alt="Farmer"
                className="rounded-xl w-full h-64 object-cover"
              />
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">
                    AI Analysis in Progress...
                  </span>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">
                    Recommended Crops:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {["Maize", "Cassava", "Rice", "Carbage"].map((crop) => (
                      <span
                        key={crop}
                        className="bg-green-600 text-white text-xs px-2 py-1 rounded"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
