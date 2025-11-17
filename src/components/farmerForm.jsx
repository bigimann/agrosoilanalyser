import { useState, useEffect } from "react";
import axios from "axios";

const FarmerForm = () => {
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
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  // Clean up preview URL when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Handle text & select inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Revoke old preview URL
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file");
        return;
      }

      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setRecommendation(null);

    // Client-side validation
    if (!formData.soilType || !formData.rainfallLevel) {
      setError("Please fill in all required fields");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("soilType", formData.soilType);
    data.append("phLevel", formData.phLevel);
    data.append("rainfallLevel", formData.rainfallLevel);
    data.append("irrigation", formData.irrigation);
    if (image) {
      data.append("image", image);
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/farmers", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Handle successful response
      if (res.data.success) {
        setRecommendation(res.data.data.recommendedCrops);
        setUploadedImageUrl(res.data.data.imageUrl);
      } else {
        setError("Failed to analyze data");
      }
    } catch (err) {
      console.error(err);
      // Handle different error types
      if (err.response) {
        setError(err.response.data.error || "Server error occurred");
      } else if (err.request) {
        setError(
          "Cannot connect to server. Please check your internet and try again."
        );
      } else {
        setError("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
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
    setError(null);
    setUploadedImageUrl(null);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
        AgroSense-AI Form
      </h2>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Farmer Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Enter your full name"
            id="name"
            autoComplete="name"
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-gray-700 font-medium">
            Farm Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="e.g. Kwara, Nigeria"
            id="location"
            autoComplete="on"
          />
        </div>

        {/* Soil Type */}
        <div>
          <label htmlFor="soilType" className="block text-gray-700 font-medium">
            Soil Type <span className="text-red-500">*</span>
          </label>
          <select
            name="soilType"
            value={formData.soilType}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            id="soilType"
          >
            <option value="">Select soil type</option>
            <option value="loamy">Loamy</option>
            <option value="clay">Clay</option>
            <option value="sandy">Sandy</option>
            <option value="peaty">Peaty</option>
          </select>
        </div>

        {/* pH Level */}
        <div>
          <label htmlFor="phLevel" className="block text-gray-700 font-medium">
            Soil pH Level
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="14"
            name="phLevel"
            value={formData.phLevel}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="e.g. 6.5"
            id="phLevel"
            autoComplete="on"
          />
        </div>

        {/* Rainfall Level */}
        <div>
          <label
            htmlFor="rainfallLevel"
            className="block text-gray-700 font-medium"
          >
            Rainfall Level <span className="text-red-500">*</span>
          </label>
          <select
            name="rainfallLevel"
            value={formData.rainfallLevel}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            id="rainfallLevel"
          >
            <option value="">Select rainfall level</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Irrigation */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="irrigation"
            checked={formData.irrigation}
            onChange={handleChange}
            className="mr-2 w-4 h-4"
            id="irrigation"
          />
          <label htmlFor="irrigation" className="text-gray-700">
            Irrigation available
          </label>
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="imageUpload"
            className="block text-gray-700 font-medium"
          >
            Upload Soil Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-lg p-2"
            id="imageUpload"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 rounded-lg w-full h-48 object-cover border-2 border-green-200"
            />
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Analyzing..." : "Submit Data"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 rounded-lg transition cursor-pointer"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Recommendation Results */}
      {recommendation && (
        <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-xl">
          <h3 className="text-lg font-semibold text-green-700">
            ✅ Recommended Crops:
          </h3>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            {recommendation.map((crop, index) => (
              <li key={index} className="py-1">
                {crop}
              </li>
            ))}
          </ul>
          {uploadedImageUrl && (
            <div className="mt-3 pt-3 border-t border-green-200">
              <p className="text-sm text-gray-600">
                ✓ Soil image uploaded successfully
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FarmerForm;
