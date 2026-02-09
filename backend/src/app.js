import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import Job from "./models/job.js";

import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js";
import savedViewsRoutes from "./routes/savedViews.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);
app.use("/saved-views", savedViewsRoutes);

// Database Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://Rounak:RounakNST2024@cluster0.agyhrwz.mongodb.net/jobtracker?appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// FEATURE 4: Follow-up Reminder Cron Job
// Runs every day at 9:00 AM
cron.schedule('0 9 * * *', async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of today

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow

        // Find jobs with follow-up date = today
        const jobsDueToday = await Job.find({
            followUpDate: {
                $gte: today,
                $lt: tomorrow
            }
        }).populate('userId', 'name email');

        if (jobsDueToday.length > 0) {
            console.log(`\n🔔 Follow-up Reminders for ${today.toDateString()}:`);
            jobsDueToday.forEach(job => {
                console.log(`  - ${job.company} (${job.role}) - User: ${job.userId.name}`);
            });
        }
    } catch (error) {
        console.error('Error in follow-up reminder cron:', error);
    }
});

console.log('✅ Follow-up reminder cron job scheduled (daily at 9:00 AM)');

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
