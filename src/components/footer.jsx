export default function Footer() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">🌾 AgroSense-AI</h3>
          <p className="text-gray-400">
            Empowering farmers with intelligent crop recommendations
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#features" className="hover:text-green-400 transition">
                Features
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="hover:text-green-400 transition"
              >
                How It Works
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-green-400 transition">
                About Us
              </a>
            </li>
            <li>
              <button
                onClick={() => navigate("/form")}
                className="hover:text-green-400 transition"
              >
                Get Started
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-green-400 transition">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400 transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400 transition">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li>📧 eneojogoswill@gmail.com</li>
            <li>📱 +234 81 0824 2808</li>
            <li>📍 Ilorin, Nigeria</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} AgroSense-AI. All rights reserved.
        </p>
      </div>
    </div>
  );
}
