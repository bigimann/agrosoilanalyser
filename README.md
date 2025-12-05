# 🌾 AgroSoilAnalyser

An intelligent agricultural platform that leverages AI to provide personalized crop recommendations for farmers based on soil conditions, climate data, and location-specific factors.

![AgroSoilAnalyser](https://img.shields.io/badge/version-1.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.x-blue.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Admin Dashboard](#admin-dashboard)
- [AI Integration](#ai-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

AgroSoilAnalyser is a full-stack web application designed to help farmers make informed decisions about crop selection. By analyzing soil type, pH levels, rainfall patterns, and location data, the platform uses Claude AI to generate intelligent, context-aware crop recommendations tailored to African agriculture, particularly Nigeria.

### Key Capabilities

- **AI-Powered Recommendations**: Uses Anthropic's Claude AI for intelligent crop analysis
- **Soil Image Upload**: Cloudinary integration for soil image storage and analysis
- **Real-time Analysis**: Instant feedback on optimal crops for specific conditions
- **Admin Dashboard**: Comprehensive management interface with authentication
- **Data Export**: CSV export functionality for reporting and analysis
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## ✨ Features

### For Farmers

- 📝 Simple data submission form
- 📸 Soil image upload with drag-and-drop
- 🤖 AI-powered crop recommendations
- 🌟 Priority crop highlighting
- 💡 Personalized farming tips
- 📊 Visual results display

### For Administrators

- 🔐 Secure authentication system
- 📊 Comprehensive farmer data dashboard
- 🔍 Advanced filtering and search
- 📥 CSV export functionality
- 📈 Pagination for large datasets
- 👤 User management

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### External Services

- **Anthropic Claude AI** - Crop recommendation engine
- **Cloudinary** - Image storage and management
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (v4.4 or higher)
- **Git**

You'll also need accounts for:

- [Anthropic](https://console.anthropic.com/) - For Claude AI API
- [Cloudinary](https://cloudinary.com/) - For image storage

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/bigimann/agrosoilanalyser.git
cd agrosoilanalyser
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Set Up MongoDB

**Option A: Local MongoDB**

```bash
# Install MongoDB locally
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**

- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster
- Get your connection string

### 5. Configure Environment Variables

Create `.env` file in the `backend` directory:

```bash
cd backend
touch .env
```

See [Environment Variables](#environment-variables) section for details.

## 🔐 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/agrosense
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agrosense

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Anthropic AI
ANTHROPIC_API_KEY=sk-ant-api03-your-anthropic-api-key

# Authentication
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long

# Optional: Generate secure JWT secret
# Run: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Frontend

If using environment variables in frontend, create `.env` in `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

### Getting API Keys

#### Anthropic Claude AI

1. Visit [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys
4. Create a new API key
5. Copy the key (starts with `sk-ant-api03-`)

#### Cloudinary

1. Visit [https://cloudinary.com/](https://cloudinary.com/)
2. Sign up for a free account
3. Go to Dashboard
4. Copy: Cloud Name, API Key, API Secret

## 📁 Project Structure

```
agrosoilanalyser/
├── backend/
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   └── farmerController.js    # Farmer data logic
│   ├── middleware/
│   │   └── auth.js                # JWT authentication middleware
│   ├── models/
│   │   ├── Admin.js               # Admin user schema
│   │   └── Farmer.js              # Farmer data schema
│   ├── routes/
│   │   ├── authRoute.js           # Auth endpoints
│   │   └── farmerRoute.js         # Farmer endpoints
│   ├── services/
│   │   └── aiService.js           # Claude AI integration
│   ├── uploads/                   # Temporary image storage
│   ├── .env                       # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js                  # Entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx # Route protection
│   │   │   └── FarmerForm.jsx     # Farmer submission form
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx # Admin interface
│   │   │   ├── Login.jsx          # Admin login
│   │   │   └── Register.jsx       # Admin registration
│   │   ├── App.jsx                # Main app component
│   │   ├── index.js               # Entry point
│   │   └── index.css              # Global styles
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

## 💻 Usage

### Development Mode

**Start Backend Server:**

```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

**Start Frontend Development Server:**

```bash
cd frontend
npm start
# App opens at http://localhost:3000
```

### Production Build

**Build Frontend:**

```bash
cd frontend
npm run build
```

**Start Production Server:**

```bash
cd backend
NODE_ENV=production npm start
```

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register Admin

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Admin registered successfully",
  "token": "jwt_token_here",
  "admin": {
    "id": "admin_id",
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

#### Login Admin

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

#### Get Admin Profile

```http
GET /api/auth/profile
Authorization: Bearer {token}
```

### Farmer Data Endpoints

#### Submit Farmer Data (Public)

```http
POST /api/farmers
Content-Type: multipart/form-data

{
  "name": "John Doe",
  "location": "Kaduna, Nigeria",
  "soilType": "loamy",
  "phLevel": "6.5",
  "rainfallLevel": "high",
  "irrigation": "true",
  "image": [file]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "farmer_id",
    "imageUrl": "cloudinary_url",
    "recommendedCrops": ["Maize", "Cassava", "Rice"],
    "reasoning": "AI explanation",
    "priority": "Maize",
    "tips": ["Tip 1", "Tip 2"],
    "aiPowered": true
  },
  "metadata": { ... }
}
```

#### Get All Farmers (Protected)

```http
GET /api/farmers?page=1&limit=25&soilType=loamy&location=Kaduna
Authorization: Bearer {token}
```

**Query Parameters:**

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 25)
- `soilType` - Filter by soil type
- `location` - Filter by location
- `rainfallLevel` - Filter by rainfall

#### Get Single Farmer (Protected)

```http
GET /api/farmers/:id
Authorization: Bearer {token}
```

## 🔐 Admin Dashboard

### Access

Navigate to `http://localhost:3000/admin/login`

### Features

1. **Authentication**

   - Secure JWT-based login
   - Password hashing with bcrypt
   - Token expiration (7 days)

2. **Dashboard**

   - View all farmer submissions
   - Filter by location, soil type, rainfall
   - Search functionality
   - Pagination

3. **Data Export**

   - Export filtered data to CSV
   - Includes all farmer information
   - Timestamped filenames

4. **User Management**
   - Admin profile display
   - Logout functionality
   - Session management

### Creating First Admin

```bash
# Method 1: Use the registration page
# Navigate to http://localhost:3000/admin/register

# Method 2: Use API directly
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@agrosense.com",
    "password": "securepassword123"
  }'
```

## 🤖 AI Integration

### How It Works

1. **Data Collection**: Farmer submits soil and location data
2. **AI Analysis**: Claude AI analyzes the data with context about:
   - Local climate patterns
   - Soil compatibility
   - Water availability
   - Market demand in the region
3. **Recommendations**: AI generates:
   - 5-8 suitable crops
   - Priority crop selection
   - Reasoning for recommendations
   - Practical farming tips
4. **Fallback**: If AI is unavailable, uses rule-based logic

### Customizing AI Prompts

Edit `backend/services/aiService.js` to customize the AI behavior:

```javascript
const prompt = `You are an expert agricultural advisor...
// Modify this prompt to change AI behavior
`;
```

### AI Response Structure

```json
{
  "recommendedCrops": ["Crop1", "Crop2", ...],
  "reasoning": "Explanation of recommendations",
  "priority": "Top recommended crop",
  "tips": ["Tip 1", "Tip 2", "Tip 3"]
}
```

## 🚀 Deployment

### Backend Deployment (Heroku Example)

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create agrosense-api

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set ANTHROPIC_API_KEY=your_key
heroku config:set CLOUD_NAME=your_cloudinary_name
# ... set all environment variables

# Deploy
git push heroku main

# Open app
heroku open
```

### Frontend Deployment (Vercel Example)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel

# Follow prompts
# Set environment variables in Vercel dashboard
```

### Environment Considerations

**Production Checklist:**

- ✅ Use strong JWT secret (64+ characters)
- ✅ Enable HTTPS
- ✅ Set NODE_ENV=production
- ✅ Use MongoDB Atlas for database
- ✅ Configure CORS properly
- ✅ Set up rate limiting
- ✅ Enable compression
- ✅ Use PM2 for process management

## 🔧 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**: Ensure MongoDB is running or check connection string

**2. Cloudinary Upload Error**

```
Error: Must supply api_key
```

**Solution**: Check `.env` file has correct Cloudinary credentials (no `VITE_` prefix)

**3. AI Prediction Fails**

```
AI service unavailable
```

**Solution**: Verify `ANTHROPIC_API_KEY` is set correctly in `.env`

**4. JWT Token Invalid**

```
Error: Invalid token
```

**Solution**: Clear localStorage and login again, or check JWT_SECRET

**5. CORS Error**

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution**: Ensure backend CORS is configured to accept frontend URL

### Debug Mode

Enable debug logging:

```bash
# Backend
DEBUG=* npm start

# Frontend
REACT_APP_DEBUG=true npm start
```

## 🧪 Testing

### Manual Testing

**Test Farmer Submission:**

1. Navigate to `http://localhost:3000`
2. Fill out the form with sample data
3. Upload a soil image
4. Submit and verify recommendations

**Test Admin Dashboard:**

1. Register/Login at `http://localhost:3000/admin/login`
2. View submissions
3. Test filters and pagination
4. Export CSV

### API Testing with cURL

```bash
# Register admin
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Get farmers (replace TOKEN)
curl -X GET http://localhost:5000/api/farmers \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use ES6+ syntax
- Follow Airbnb JavaScript Style Guide
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - _Initial work_ - [YourGithub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Anthropic for Claude AI
- Cloudinary for image management
- The open-source community
- All farmers who inspire this project

## 📞 Support

For support, email support@agrosoilanalyser.com or open an issue on GitHub.

## 🗺️ Roadmap

### Version 1.1

- [ ] Weather API integration
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] SMS notifications

### Version 1.2

- [ ] Marketplace integration
- [ ] Community forum
- [ ] Video tutorials
- [ ] Offline mode

### Version 2.0

- [ ] Computer vision for soil analysis
- [ ] Pest detection
- [ ] Yield prediction
- [ ] IoT sensor integration

---

**Built with ❤️ for farmers everywhere**

For more information, visit our [LinkedIn](www.linkedin.com/in/eneojo) or contact us at eneojogoswill@gmail.com
