import React, { useState, useEffect } from "react";
import axios from "axios";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    soilType: "",
    phLevel: "",
    rainfallLevel: "",
    irrigation: false,
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reasoning, setReasoning] = useState(null);
  const [priority, setPriority] = useState(null);
  const [tips, setTips] = useState([]);
  const [aiPowered, setAiPowered] = useState(false);

  const totalSteps = 4;

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (error) setError(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const nextStep = () => {
    // Validation for each step
    if (currentStep === 1 && (!formData.name || !formData.location)) {
      setError("Please fill in all fields");
      return;
    }
    if (currentStep === 2 && !formData.soilType) {
      setError("Please select a soil type");
      return;
    }
    if (currentStep === 3 && !formData.rainfallLevel) {
      setError("Please select rainfall level");
      return;
    }
    setError(null);
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (image) {
      data.append("image", image);
    }

    try {
      const res = await axios.post(
        `${
          process.env.REACT_APP_API_URL || "http://localhost:5000"
        }/api/farmers`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        setRecommendation(res.data.data.recommendedCrops);
        setReasoning(res.data.data.reasoning);
        setPriority(res.data.data.priority);
        setTips(res.data.data.tips || []);
        setAiPowered(res.data.data.aiPowered);
        setCurrentStep(5); // Results step
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      soilType: "",
      phLevel: "",
      rainfallLevel: "",
      irrigation: false,
    });
    setImage(null);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setRecommendation(null);
    setReasoning(null);
    setPriority(null);
    setTips([]);
    setAiPowered(false);
    setError(null);
    setCurrentStep(1);
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4].map((step) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                  currentStep >= step
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
              <div className="text-xs mt-2 text-gray-600">
                {step === 1 && "Personal"}
                {step === 2 && "Soil"}
                {step === 3 && "Climate"}
                {step === 4 && "Review"}
              </div>
            </div>
            {step < 4 && (
              <div
                className={`flex-1 h-1 mx-2 transition ${
                  currentStep > step ? "bg-green-600" : "bg-gray-200"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Personal Information
            </h2>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Farmer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border-2 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Farm Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full border-2 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="e.g. Kaduna, Nigeria"
              />
              <p className="text-sm text-gray-500 mt-1">
                💡 Specific location helps us provide better recommendations
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Soil Details
            </h2>
            <div>
              <label className="block text-gray-700 font-medium mb-3">
                Soil Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    value: "loamy",
                    label: "Loamy",
                    icon: "🟤",
                    desc: "Best for most crops",
                  },
                  {
                    value: "clay",
                    label: "Clay",
                    icon: "🔴",
                    desc: "Holds water well",
                  },
                  {
                    value: "sandy",
                    label: "Sandy",
                    icon: "🟡",
                    desc: "Drains quickly",
                  },
                  {
                    value: "peaty",
                    label: "Peaty",
                    icon: "🟫",
                    desc: "Rich in organic matter",
                  },
                ].map((soil) => (
                  <label
                    key={soil.value}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                      formData.soilType === soil.value
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="soilType"
                      value={soil.value}
                      checked={formData.soilType === soil.value}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className="text-3xl mb-2">{soil.icon}</div>
                    <div className="font-bold text-gray-900">{soil.label}</div>
                    <div className="text-sm text-gray-600">{soil.desc}</div>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Soil pH Level (Optional)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="14"
                name="phLevel"
                value={formData.phLevel}
                onChange={handleChange}
                className="w-full border-2 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="e.g. 6.5"
              />
              <div className="mt-2 flex items-center gap-2 text-sm">
                <span className="text-gray-600">pH Scale:</span>
                <div className="flex-1 h-2 rounded-full bg-linear-to-r from-red-500 via-green-500 to-blue-500"></div>
                <div className="text-xs text-gray-500">
                  <span>Acidic ← Neutral → Alkaline</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Climate Information
            </h2>
            <div>
              <label className="block text-gray-700 font-medium mb-3">
                Rainfall Level <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {[
                  {
                    value: "low",
                    label: "Low",
                    icon: "🌤️",
                    desc: "Less than 500mm/year",
                  },
                  {
                    value: "medium",
                    label: "Medium",
                    icon: "🌦️",
                    desc: "500-1000mm/year",
                  },
                  {
                    value: "high",
                    label: "High",
                    icon: "🌧️",
                    desc: "More than 1000mm/year",
                  },
                ].map((rainfall) => (
                  <label
                    key={rainfall.value}
                    className={`flex items-center border-2 rounded-lg p-4 cursor-pointer transition ${
                      formData.rainfallLevel === rainfall.value
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="rainfallLevel"
                      value={rainfall.value}
                      checked={formData.rainfallLevel === rainfall.value}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className="text-3xl mr-4">{rainfall.icon}</div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">
                        {rainfall.label}
                      </div>
                      <div className="text-sm text-gray-600">
                        {rainfall.desc}
                      </div>
                    </div>
                    {formData.rainfallLevel === rainfall.value && (
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </label>
                ))}
              </div>
            </div>
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="irrigation"
                  checked={formData.irrigation}
                  onChange={handleChange}
                  className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                />
                <div className="ml-3">
                  <div className="font-medium text-gray-900">
                    💧 Irrigation Available
                  </div>
                  <div className="text-sm text-gray-600">
                    Check if you have access to irrigation systems
                  </div>
                </div>
              </label>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Review & Submit
            </h2>

            {/* Summary */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                📋 Your Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Name</div>
                  <div className="font-semibold">{formData.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Location</div>
                  <div className="font-semibold">{formData.location}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Soil Type</div>
                  <div className="font-semibold capitalize">
                    {formData.soilType}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">pH Level</div>
                  <div className="font-semibold">
                    {formData.phLevel || "Not provided"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Rainfall</div>
                  <div className="font-semibold capitalize">
                    {formData.rainfallLevel}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Irrigation</div>
                  <div className="font-semibold">
                    {formData.irrigation ? "Yes" : "No"}
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload Soil Image (Optional)
              </label>

              {!preview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition cursor-pointer bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-12 h-12 text-gray-400 mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-semibold text-green-600">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, JPEG up to 5MB
                      </p>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="relative border-2 border-green-300 rounded-lg overflow-hidden">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (preview) {
                          URL.revokeObjectURL(preview);
                        }
                        setPreview(null);
                        setImage(null);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition cursor-pointer"
                      title="Remove image"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="bg-white p-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-sm text-gray-700 font-medium">
                          {image?.name || "Image selected"}
                        </span>
                      </div>
                      <label
                        htmlFor="file-upload-change"
                        className="text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer"
                      >
                        Change
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="file-upload-change"
                      />
                    </div>
                    {image && (
                      <p className="text-xs text-gray-500 mt-1">
                        Size: {(image.size / 1024).toFixed(2)} KB
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Analysis Complete!
              </h2>
              <p className="text-gray-600">
                Here are your personalized crop recommendations
              </p>
            </div>

            {aiPowered && (
              <div className="flex items-center justify-center gap-2 text-sm text-purple-600 bg-purple-50 p-3 rounded-lg">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 7H7v6h6V7z" />
                  <path
                    fillRule="evenodd"
                    d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">Powered by Claude AI</span>
              </div>
            )}

            {priority && (
              <div className="p-6 bg-linear-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 rounded-lg">
                <h3 className="text-sm font-semibold text-green-700 mb-2">
                  🌟 Top Priority Crop
                </h3>
                <p className="text-2xl font-bold text-green-800">{priority}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Start with this crop for best results
                </p>
              </div>
            )}

            <div className="p-6 bg-white border-2 border-green-200 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-green-700 mb-4">
                ✅ Recommended Crops
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {recommendation.map((crop, index) => (
                  <div
                    key={index}
                    className="bg-green-50 border border-green-200 rounded-lg p-3 text-center hover:bg-green-100 transition"
                  >
                    <span className="font-semibold text-green-800">{crop}</span>
                  </div>
                ))}
              </div>
            </div>

            {reasoning && (
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Why These Crops?
                </h3>
                <p className="text-gray-700 leading-relaxed">{reasoning}</p>
              </div>
            )}

            {tips && tips.length > 0 && (
              <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-sm font-semibold text-yellow-700 mb-3">
                  🌱 Farming Tips
                </h3>
                <ul className="space-y-2">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-yellow-600 mt-1">•</span>
                      <span className="text-gray-700 flex-1">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={resetForm}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Start New Analysis
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition"
              >
                Print Results
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-700 mb-2">
              🌾 AgroSoilAssistant
            </h1>
            <p className="text-gray-600">Get AI-powered crop recommendations</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg text-red-700 flex items-start gap-3">
              <svg
                className="w-5 h-5 mt-0.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Step Indicator */}
          {currentStep <= 4 && renderStepIndicator()}

          {/* Form */}
          <div>
            {renderStep()}

            {/* Navigation Buttons */}
            {currentStep <= 4 && (
              <div className="flex gap-4 mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                  >
                    ← Back
                  </button>
                )}
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? "Analyzing..." : "Get Recommendations 🚀"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
