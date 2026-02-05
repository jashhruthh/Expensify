# 💰 Expensify – A MERN Based Personal Finance Tracker

Expensify is a full-stack personal finance tracker built using the **MERN stack** (MongoDB, Express, React, Node.js).  
It helps users manage income, expenses, budgets, and visualize spending patterns through clean dashboards and analytics.

## ✨ Features

### 🔐 Authentication
- User registration  
- Secure login  
- JWT-based authentication  
- Protected API routes  

### 📊 Dashboard
- Monthly **income / expense / balance**
- Budget progress bar  
- Recent transactions list  
- Add / Edit / Delete transactions  
- Set and update monthly budget  
- Month-to-month financial comparison  

### 📈 Analytics
- Category-wise expenses (Pie Chart)
- Monthly Income vs Expense (Bar Chart)
- Dark-mode optimized charts  
- Clean financial insights  

### 🎨 UI / UX
- Modern, responsive UI  
- Light & Dark mode  
- Floating Add button  
- Smooth animations  
- Clean card-based layout  
- Modern Login Page  

### 💾 Backend
- REST API using Express  
- MongoDB (local or Atlas)  
- JWT Authentication  
- Transaction & User models  
- Summary endpoints for analytics  

## 🖼️ Screenshots

### 🔐 Login Page
![Login](https://github.com/jashronix/Expensify/blob/main/screenshots/Login.png)

### 📊 Dashboard(Dark Mode)
![Dashboard](https://github.com/jashronix/Expensify/blob/main/screenshots/Dashboard-Dark.png)

### 📊 Dashboard(Light Mode)
![Dashboard](https://github.com/jashronix/Expensify/blob/main/screenshots/Dashboard-Light.png)

### ➕ Add Transaction
![Add Transaction](https://github.com/jashronix/Expensify/blob/main/screenshots/Add-Transaction.png)

### 📝 Edit Transaction
![Edit Transaction](https://github.com/jashronix/Expensify/blob/main/screenshots/Edit-Transaction.png)

### 📈 Analytics
![Analytics](https://github.com/jashronix/Expensify/blob/main/screenshots/Analytics.png)

## 🛠️ Tech Stack

### **Frontend**
- React.js  
- React Router  
- Context API  
- Chart.js  
- Axios  

### **Backend**
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT Authentication  

## 📁 Project Structure
```
Expensify/
│
├── Backend/ # Node.js + Express + MongoDB API
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── ...
│
└── Frontend/ # React UI
├── public/
├── src/
│ ├── pages/
│ ├── components/
│ ├── context/
│ ├── api/
│ ├── App.jsx
│ ├── app.css
│ └── ...
└── ...
```

## 🚀 How to Run the Project
Follow these steps to run both the Backend (Node.js + Express) and Frontend (React).
```
⚙️ 1. Clone the Repository
git clone https://github.com/jashronix/Expensify.git
cd Expensify

🔧 2. Setup the Backend
Go inside the backend folder:
cd Backend

Install dependencies:
npm install

Create a .env file inside Backend
Put the following values:
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Start backend server:
npm run dev
If successful, you will see:
MongoDB connected successfully
Server running on port 5000

💻 3. Setup the Frontend
Open a NEW terminal (keep backend running).
Go to the frontend folder:
cd Frontend
Install dependencies:
npm install
Start frontend:
npm start

This will automatically open the app at:

👉 http://localhost:3000/
```
🎯 Conclusion
Expensify is a clean, modern and full-stack MERN application capable of managing day-to-day finances with powerful analytics and a smooth interface.
Feel free to fork, star ⭐ the repo, or contribute!

## 👨‍💻 Author
Jashruth K A  
GitHub:https://github.com/jashhruthh
