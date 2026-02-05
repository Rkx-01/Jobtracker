import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js";

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);

// Database Connection
// Fallback to hardcoded URI if env var is missing (for student ease)
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://Rounak:RounakNST2024@cluster0.agyhrwz.mongodb.net/jobtracker?appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
