import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Helper to check DB connection
const checkDbConnection = () => {
    if (mongoose.connection.readyState !== 1) {
        throw new Error("Database not connected. Please check MongoDB Atlas IP whitelist.");
    }
};

// Register
export const register = async (req, res) => {
    try {
        checkDbConnection();

        const { name, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Register error:", error.message);
        if (error.message.includes("Database not connected")) {
            return res.status(503).json({
                error: "Database connection failed. Please add your IP (42.107.191.48) to MongoDB Atlas whitelist.",
                details: "Visit: https://cloud.mongodb.com → Network Access → Add IP Address"
            });
        }
        res.status(500).json({ error: "Server error: " + error.message });
    }
};

// Login
export const login = async (req, res) => {
    try {
        checkDbConnection();

        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error("Login error:", error.message);
        if (error.message.includes("Database not connected")) {
            return res.status(503).json({
                error: "Database connection failed. Please add your IP (42.107.191.48) to MongoDB Atlas whitelist.",
                details: "Visit: https://cloud.mongodb.com → Network Access → Add IP Address"
            });
        }
        res.status(500).json({ error: "Server error: " + error.message });
    }
};
