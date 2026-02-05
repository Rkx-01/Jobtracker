import Job from "../models/job.js";
import { parseEmail } from "../services/emailService.js";

// Add Job by parsing email
export const parseAndAddJob = async (req, res) => {
  try {
    const { emailText } = req.body;
    const userId = req.user.userId; // From authMiddleware

    const parsedData = parseEmail(emailText);
    if (!parsedData) return res.status(400).json({ error: "No text provided" });

    const job = await Job.create({
      userId,
      ...parsedData
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: "Failed to add job" });
  }
};

// Get all jobs for user
export const getJobs = async (req, res) => {
  try {
    const userId = req.user.userId;
    const jobs = await Job.find({ userId }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// Delete job
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Job.findByIdAndDelete(id);
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete job" });
  }
};
