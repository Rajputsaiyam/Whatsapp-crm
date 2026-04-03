
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";
import sequenceRoutes from "./routes/sequenceRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect Database
connectDB();

// Test Route (IMPORTANT for checking server)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Routes (we will add later step-by-step)
app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/sequences", sequenceRoutes);
app.use("/api/chat", chatRoutes);

// Start server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});