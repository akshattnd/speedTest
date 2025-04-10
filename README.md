# ⌨️ Typing Speed Test App

A full-stack web application that lets users test and track their typing speed (WPM), accuracy, and total time taken. It features real-time feedback, authentication, and performance tracking per user.

---

## 🚀 Features

- 📝 Real-time WPM and Accuracy calculation
- 📈 Track typing performance history
- 👤 User authentication (JWT-based)
- 🧠 Responsive UI with live word highlighting
- 🔧 Configurable test length and punctuation toggle
- 💾 Stores results in MongoDB per user session
- 🔐 Protected routes and secure backend

---

## 🛠 Tech Stack

### Frontend:

- **React** + **TypeScript**
- **TailwindCSS** + **ShadCN/UI**
- **React Query** – API data fetching
- **Redux Toolkit (RTK)** – global state management
- **React Router** – routing

### Backend:

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** – authentication
- **Bcrypt** – password hashing

---

## 📦 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/akshattnd/speed-
cd typing-speed-test

# Install dependencies
npm install

# Environment variables
Create a `.env` file in the root of the backend with:
  MONGO_URI=your_mongodb_uri
  JWT_SECRET=your_secret_key

# Start frontend and backend
npm run dev      # or use concurrently to run both
```
