import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FarmerForm from "./components/farmerForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/adminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<FarmerForm />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
