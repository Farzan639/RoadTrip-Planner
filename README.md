# 🧭 TripVerse – Road Trip Planner  
A full-stack MERN application that allows users to create, manage, and explore road trips with authentication and persistent storage.

✨ **Live Demo:** https://road-trip-planner-xi.vercel.app/  
📦 **Repository:** https://github.com/Farzan639/RoadTrip-Planner

---

## ⭐ Overview  
TripVerse is a single-page web application designed to help users plan and manage their road trips.  
It provides user authentication, trip CRUD operations, trip image upload, and a clean, responsive UI built with React and Vite.  
The backend is powered by Node.js, Express, MongoDB, and JWT-based authentication.

---

## 🚀 Features  

### 🔐 Authentication
- User Signup  
- User Login  
- JWT-based authentication  
- Protected API routes  

### 🧭 Trip Management
- ➕ Add new trip  
- 🗑️ Delete trip  
- 📃 View all trips  
- 🔍 Explore trip section  
- Trip image upload  
- User-specific trip data  

### 👤 User Features
- User Profile  
- user can create trips 

### 🎨 Frontend
- Responsive UI (mobile + desktop)  
- Clean modern design  
- SPA with React + Vite  
- Component-based architecture  

### 🗄 Backend
- REST API built with Express  
- MongoDB Atlas for database  
- Mongoose models  
- Secure JWT authentication  

---

## 🏗️ Tech Stack  

### **Frontend**
- React  
- Vite  
- CSS / Tailwind 
- Axios  

### **Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JSON Web Tokens (JWT)  
- Multer (if used for image uploads)

### **Deployment**
- Vercel (Frontend)  
- MongoDB Atlas Cloud  

---

## 📁 Project Structure  

```
RoadTrip-Planner/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup  

### 🔹 Clone the repository
```bash
git clone https://github.com/Farzan639/RoadTrip-Planner
cd RoadTrip-Planner
```

---

## 🛠️ Backend Setup (Node + MongoDB)

```bash
cd backend
npm install
```

### Create a `.env` file:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
cloudinary
```

### Start server:
```bash
npm run dev
```

---

## 💻 Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 API Endpoints (Example)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/trips | Get user trips |
| POST | /api/trips | Add trip |
| DELETE | /api/trips/:id | Delete trip |
| GET | /api/trips/explore | Explore trips |
| POST | /api/upload | Image upload |

---

## 🚀 Deployment Notes  
### **Frontend (Vercel)**
- Framework Preset: **Vite**  
- Build Command: `npm run build`  
- Output Directory: `dist`  

### **Backend**
- Deploy to Render / Railway / local machine  
- Ensure environment variables are set (Mongo URI, JWT secret)

---

## 🔒 Authentication Flow

1. User signs up → server issues JWT  
2. JWT stored in `localStorage`  
3. User logs in → token added to headers for each request  
4. Protected routes require:  
   ```
   Authorization: Bearer <token>
   ```
5. Users can access anyone's trips  

---

## 🎨 UI & UX Highlights  
- Clean modern layout  
- Fully responsive  
- Explore Trip + My Trips section  
- Card-based layout for trip details  
- Smooth navigation  

---

## 👤 Author  
**Mohd Farzan**  
Full Stack Developer • React • Node.js • MongoDB  

---
