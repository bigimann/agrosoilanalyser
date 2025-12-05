import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const AdminDashboard = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  const [pagination, setPagination] = useState({ total: 0, pages: 0 });
  const [filter, setFilter] = useState({
    soilType: "",
    location: "",
    rainfallLevel: "",
  });
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  // Get admin info on mount
  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
  }, []);

  // Get auth token
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchFarmers = async (p = 1) => {
    setLoading(true);
    setError(null);
    try {
      const params = { page: p, limit };
      if (filter.soilType) params.soilType = filter.soilType;
      if (filter.location) params.location = filter.location;
      if (filter.rainfallLevel) params.rainfallLevel = filter.rainfallLevel;

      const queryString = new URLSearchParams(params).toString();
      const res = await axios.get(
        `http://localhost:5000/api/farmers?${queryString}`,
        getAuthHeader()
      );

      if (res.data.success) {
        setFarmers(res.data.data);
        setPagination(res.data.pagination);
      } else {
        setError("Failed to fetch data");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        // Token expired or invalid
        handleLogout();
      } else {
        setError(
          err.response?.data?.error || "Failed to fetch farmers. Check server."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers(page);
  }, [page]);

  const handleApplyFilter = () => {
    setPage(1);
    fetchFarmers(1);
  };

  const handleClearFilter = () => {
    setFilter({ soilType: "", location: "", rainfallLevel: "" });
    setPage(1);
    setTimeout(() => fetchFarmers(1), 0);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  const exportCSV = () => {
    if (farmers.length === 0) {
      alert("No data to export");
      return;
    }

    const csvRows = [];
    const headers = [
      "ID",
      "Name",
      "Location",
      "Soil Type",
      "pH Level",
      "Rainfall",
      "Irrigation",
      "Recommended Crops",
      "Image URL",
      "Created At",
    ];
    csvRows.push(headers.join(","));

    for (const f of farmers) {
      const row = [
        f._id,
        `"${(f.name || "").replace(/"/g, '""')}"`,
        `"${(f.location || "").replace(/"/g, '""')}"`,
        f.soilType || "",
        f.phLevel || "",
        f.rainfallLevel || "",
        f.irrigation || false,
        `"${(f.recommendedCrops || []).join("; ")}"`,
        f.imageUrl || "",
        new Date(f.createdAt).toISOString(),
      ];
      csvRows.push(row.join(","));
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `agrosoilassistant_farmers_page${page}_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logout */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-green-700">
              Admin Dashboard
            </h1>
            {admin && (
              <p className="text-sm text-gray-600 mt-1">
                Welcome, {admin.username} ({admin.role})
              </p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Filters */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Filters</h2>
          <div className="flex flex-wrap gap-3">
            <input
              placeholder="Search by location"
              value={filter.location}
              onChange={(e) =>
                setFilter({ ...filter, location: e.target.value })
              }
              className="border p-2 rounded flex-1 min-w-[200px] focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <select
              value={filter.soilType}
              onChange={(e) =>
                setFilter({ ...filter, soilType: e.target.value })
              }
              className="border p-2 rounded min-w-[150px] focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="">All soil types</option>
              <option value="loamy">Loamy</option>
              <option value="clay">Clay</option>
              <option value="sandy">Sandy</option>
              <option value="peaty">Peaty</option>
            </select>
            <select
              value={filter.rainfallLevel}
              onChange={(e) =>
                setFilter({ ...filter, rainfallLevel: e.target.value })
              }
              className="border p-2 rounded min-w-[150px] focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="">All rainfall levels</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button
              onClick={handleApplyFilter}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
            >
              Apply
            </button>
            <button
              onClick={handleClearFilter}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded transition"
            >
              Clear
            </button>
            <button
              onClick={exportCSV}
              disabled={farmers.length === 0}
              className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              📥 Export CSV
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-300 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Loading / Empty / Data */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Loading farmers...</p>
          </div>
        ) : farmers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No farmer submissions found</p>
            <p className="text-gray-400 mt-2">
              Try adjusting your filters or check back later
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-green-700 text-white">
                      <th className="p-3 text-left">S/N</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Location</th>
                      <th className="p-3 text-left">Soil</th>
                      <th className="p-3 text-left">pH</th>
                      <th className="p-3 text-left">Rainfall</th>
                      <th className="p-3 text-left">Irrigation</th>
                      <th className="p-3 text-left">Recommended Crops</th>
                      <th className="p-3 text-left">Image</th>
                      <th className="p-3 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {farmers.map((f, i) => (
                      <tr
                        key={f._id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="p-3 text-gray-600">
                          {`${(page - 1) * limit + i + 1}.`}
                        </td>
                        <td className="p-3 font-medium">{f.name}</td>
                        <td className="p-3 text-gray-600">{f.location}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                            {f.soilType}
                          </span>
                        </td>
                        <td className="p-3 text-gray-600">
                          {f.phLevel ?? "—"}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-sm ${
                              f.rainfallLevel === "high"
                                ? "bg-blue-100 text-blue-700"
                                : f.rainfallLevel === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {f.rainfallLevel}
                          </span>
                        </td>
                        <td className="p-3">
                          {f.irrigation ? (
                            <span className="text-green-600">✓ Yes</span>
                          ) : (
                            <span className="text-gray-400">✗ No</span>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="max-w-[200px]">
                            {(f.recommendedCrops || []).join(", ") || "—"}
                          </div>
                        </td>
                        <td className="p-3">
                          {f.imageUrl ? (
                            <a
                              href={f.imageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={f.imageUrl}
                                alt="soil"
                                className="w-fit h-12 object-cover rounded cursor-pointer hover:scale-105 transition"
                              />
                            </a>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="p-3 text-sm text-gray-600">
                          {new Date(f.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between bg-white p-4 rounded-lg shadow overflow-x-auto">
              <div className="text-sm text-gray-600 mr-4">
                Showing {(page - 1) * limit + 1} to{" "}
                {Math.min(page * limit, pagination.total)} of {pagination.total}{" "}
                farmers
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(1)}
                  className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronsLeft />
                </button>
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft />
                </button>
                <span className="px-4 py-1 bg-green-600 text-white rounded">
                  {page}
                </span>
                <button
                  disabled={page >= pagination.pages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight />
                </button>
                <button
                  disabled={page >= pagination.pages}
                  onClick={() => setPage(pagination.pages)}
                  className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronsRight />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
