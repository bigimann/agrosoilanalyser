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
