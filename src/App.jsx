import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import MultiStepForm from "./pages/multiStepForm";
import Login from "./pages/Login";
import Register from "./pages/register";
import AdminDashboard from "./pages/adminDashboard";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/form" element={<MultiStepForm />} />
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
