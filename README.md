# 🌾 Farm2Market

Farm2Market is a full-stack MERN (MongoDB, Express, React, Node.js) web application that connects farmers, markets, and consumers by allowing users to submit and view local market entries, locations, and available products.

## 🚀 Live Demo

> https://farm2marketagritech.netlify.app/

---

## ✨ Features

- ✅ Submit new market data (name, location, product)
- 🔍 Search and filter markets by name or location
- 📍 Sort markets A–Z or Z–A by location
- 🌙 Dark/Light mode toggle
- 📦 Persisted market entries using MongoDB
- 🗑️ Delete market submissions
- ⚡ Smooth animations with Framer Motion
- 📱 Fully responsive design (Tailwind CSS)

---

## 🛠️ Tech Stack

**Frontend:**

- React + Vite
- Tailwind CSS
- Axios
- Framer Motion

**Backend:**

- Express.js
- MongoDB & Mongoose
- dotenv for environment config
- CORS & JSON middleware

---

## 📂 Project Structure

```
farm2market/
├── client/               # React frontend
│   ├── public/
│   └── src/
│       ├── App.jsx
│       └── ...
├── server/               # Express backend
│   ├── routes/
│   ├── models/
│   └── index.js
├── .env                  # Environment variables
├── package.json
└── README.md
```

---

## 🔧 Getting Started (Local Setup)

### 📁 1. Clone & Install

```bash
git clone https://github.com/yourusername/farm2market.git
cd farm2market
```

### 🔌 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Then start the backend server:

```bash
npm start
```

### 🌐 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

Visit: `http://localhost:5173`

---

## 🌍 Deployment

- **Frontend:** Deploy on [Netlify](https://netlify.com), [Vercel](https://vercel.com), or [Firebase Hosting](https://firebase.google.com).
- **Backend:** Use [Render](https://render.com) or [Railway](https://railway.app) to deploy your Node server and connect to MongoDB Atlas.

---

## 📌 Future Enhancements

- 🗘️ Map integration to visualize markets
- 📊 Analytics dashboard for market trends
- 🧻 Market categories and tags
- 👥 User authentication (JWT)
- 📨 Contact form / notifications
- 🧪 Unit and integration tests

---

## 🧑‍💻 Author

**Built with ❤️ by \[Sihle Nsimba]**

---

## 📃 License

This project is open source and available under the [MIT License](LICENSE).
