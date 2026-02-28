🚀 MERN User Management System

A full-stack User Management Application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

This project demonstrates secure authentication, REST API development, and full CRUD operations with proper frontend-backend integration.

📌 Features

🔐 User Registration & Login

🛡️ JWT Authentication & Authorization

👤 Create, Read, Update, Delete Users (CRUD)

🚦 Protected Routes using Middleware

🌐 RESTful API using Express.js

🗄️ MongoDB Database Integration

⚡ Responsive React Frontend

🔄 State Management (Redux Toolkit / Context API)

🛠️ Tech Stack
Frontend

React.js
Axios

Redux Toolkit / Context API
React Router

Backend
Node.js

Express.js
JWT (JSON Web Token)

Bcrypt.js
Database

MongoDB
Mongoose

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/abhishek01git/user-management-mern-.git
cd mern-user-management-system
2️⃣ Install Backend Dependencies
cd server
npm install
3️⃣ Install Frontend Dependencies
cd ../client
npm install
4️⃣ Create .env File (Inside server folder)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
5️⃣ Run the Application

Backend:

cd server
npm run dev

Frontend:

cd client
npm start
🔐 Authentication Flow

User logs in

Server generates JWT token

Token sent to client

Token stored securely

Protected routes verify token

🎯 Learning Outcomes

REST API Development

Secure Authentication with JWT

Middleware Implementation

Database Schema Design

Full Stack Integration

State Management in React

🚀 Future Improvements

Role-Based Access Control (Admin/User)

Password Reset Feature

Email Verification

Deployment (Render / Vercel)

👨‍💻 Author

Abhishek MP
MERN Stack Developer
