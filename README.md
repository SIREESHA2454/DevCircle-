# DevCircle 🚀

> A platform where college students showcase projects, find collaborators, and team up for hackathons.

## 🌐 Live Demo
Frontend: [Coming soon - Vercel]
Backend: [Coming soon - Render]

## 💡 About
DevCircle is a full-stack web application built for college developers to:
- Showcase their projects with tech stack and GitHub links
- Find and connect with fellow developers by skill, branch, or year
- Send and receive collaboration requests on projects
- Discover upcoming hackathons and mark interest
- Get real-time notifications via Socket.io

## 🛠️ Tech Stack

**Frontend:**
- React.js + Vite
- React Router DOM
- Axios
- Socket.io Client
- Custom CSS (no UI library)

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- Socket.io
- Multer (file uploads)

## ✨ Features
- 🔐 JWT-based authentication (Signup/Login)
- 📋 Project feed with real-time data
- 👤 User profiles with editable skills and bio
- 🔍 Search developers by skill, branch, year
- 🤝 Send/Accept/Reject collaboration requests
- 🏆 Hackathon board with interest tracking
- 🔔 Real-time notifications using Socket.io
- 📊 Dashboard for managing collab requests
- 🛡️ Protected routes

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB

### Installation

**Clone the repo:**
```bash
git clone https://github.com/SIREESHA2454/DevCircle-.git
cd DevCircle-
```

**Setup Backend:**
```bash
cd devcircle-backend
npm install
# create .env file with MONGO_URI and JWT_SECRET
npm run dev
```

**Setup Frontend:**
```bash
cd devcircle-frontend
npm install
npm run dev
```

## 📁 Project Structure
```
DevCircle/
├── devcircle-frontend/     # React + Vite
│   ├── src/
│   │   ├── pages/          # All page components
│   │   ├── components/     # Reusable components
│   │   └── context/        # Socket context
└── devcircle-backend/      # Node + Express
    ├── models/             # MongoDB schemas
    ├── routes/             # API routes
    ├── controllers/        # Business logic
    └── middleware/         # Auth middleware
```

## 👩‍💻 Author
Built with ❤️ by Sireesha.
