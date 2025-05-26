import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import marketRoutes from "./routes/marketRoutes.js"; // ✅ import router

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

const app = express();

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB successfully'))
.catch((error) => console.error('❌ Failed to connect to MongoDB:', error.message));

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Use the router for /api/markets
app.use("/api/markets", marketRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("🌍 Welcome to the Farm2Market API");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
