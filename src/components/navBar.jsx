import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMenu();
  };

  const scrollToSection = (sectionId) => {
    closeMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation("/")}
              className="text-2xl font-bold text-green-700 hover:text-green-800 transition"
            >
              🌾 AgroSense-AI
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-700 hover:text-green-600 transition"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-700 hover:text-green-600 transition"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-green-600 transition"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-green-600 transition"
            >
              Contact
            </button>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => handleNavigation("/admin/login")}
              className="text-gray-700 hover:text-green-600 transition"
            >
              Admin
            </button>
            <button
              onClick={() => handleNavigation("/form")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                // Close Icon (X)
                <X size={28} className="w-6 h-6" />
              ) : (
                // Hamburger Icon
                <Menu size={28} className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden relative z-50">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
              {/* Mobile Navigation Links */}
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition"
              >
                Contact
              </button>

              {/* Divider */}
              <div className="border-t border-gray-200 my-2"></div>

              {/* Mobile Action Buttons */}
              <button
                onClick={() => handleNavigation("/admin/login")}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition"
              >
                👤 Admin Login
              </button>
              <button
                onClick={() => handleNavigation("/form")}
                className="block w-full text-center px-3 py-3 rounded-lg text-base font-semibold text-white bg-green-600 hover:bg-green-700 transition mt-2"
              >
                Get Started →
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
