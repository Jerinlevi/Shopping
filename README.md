
# 🛒 Arcade Cart — Full Stack MERN E-Commerce App

Arcade Cart is a full-stack shopping cart application built using the MERN stack.  
It supports user authentication, product listing, cart management, and order placement with a modern React UI.

---

## 🚀 Features

- User Signup & Login (JWT Authentication)
- Product Catalog (MongoDB)
- Add Items to Cart
- Single Cart per User
- Convert Cart to Order (Checkout)
- Order History
- Responsive React UI (Vite)
- Infinite Carousel UI for perks
- Protected Routes using Token Middleware
- RESTful APIs

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- CSS (Flexbox / Grid / Animations)
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

### Deployment
- Backend: Render
- Frontend: Vercel / Netlify (optional)

---

## 📁 Project Structure

### Backend

shopping_cart_backend/
│
├── models/
│   ├── User.js
│   ├── Item.js
│   ├── Cart.js
│   └── Order.js
│
├── routes/
│   ├── userRoutes.js
│   ├── itemRoutes.js
│   ├── cartRoutes.js
│   └── orderRoutes.js
│
├── middleware/
│   └── auth.js
│
├── server.js
└── package.json

---

### Frontend

vite-project/
│
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── api/
│   │   └── api.js
│   │
│   ├── App.jsx
│   └── App.css

---

## 🔐 API Endpoints

### Users
- POST /users — Signup
- POST /users/login — Login
- GET /users — List users

### Items
- GET /items — List products
- POST /items — Add product

### Cart (Protected)
- POST /carts — Add item to cart
- GET /carts — View cart

### Orders (Protected)
- POST /orders — Checkout
- GET /orders — Order history

---

## 🧠 Flow

1. User signs up / logs in
2. JWT token stored in localStorage
3. User views products
4. Adds items to cart
5. Checkout converts cart to order
6. User can view order history

---

## ⚙️ Run Locally

### Backend

```bash
cd shopping_cart_backend
npm install
npm start

Create .env:

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret


⸻

Frontend

cd vite-project
npm install
npm run dev


⸻

📌 Future Improvements
	•	Admin dashboard
	•	Product quantity / inventory
	•	Payment gateway
	•	Image uploads
	•	Role-based access

⸻

👤 Author

Jerin J
Full Stack MERN Developer

---
