import Job from "../models/job.js";
import { parseEmail } from "../services/emailService.js";

// Add Job by parsing email
export const parseAndAddJob = async (req, res) => {
  try {
    const { emailText } = req.body;
    const userId = req.user.userId; // From authMiddleware

    console.log("Parsing email for user:", userId);
    console.log("Email text:", emailText?.substring(0, 100));

    const parsedData = parseEmail(emailText);
    if (!parsedData) {
      console.log("Parse failed: No data returned");
      return res.status(400).json({ error: "No text provided" });
    }

    console.log("Parsed data:", parsedData);

    const job = await Job.create({
      userId,
      ...parsedData
    });

    console.log("Job created successfully:", job._id);
    res.status(201).json(job);
  } catch (error) {
    console.error("ERROR in parseAndAddJob:", error);
    res.status(500).json({ error: "Failed to add job: " + error.message });
  }
};

// FEATURE 1: Get all jobs with search, filter, and sort
export const getJobs = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { search, status, sort } = req.query;

    // Build query object
    let query = { userId };

    // Search by company name (case-insensitive)
    if (search) {
      query.company = { $regex: search, $options: 'i' };
    }

    // Filter by status
    if (status && status !== 'All') {
      query.status = status;
    }

    // Determine sort order
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    }

    const jobs = await Job.find(query).sort(sortOption);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// FEATURE 3: Get analytics/stats
export const getStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Count jobs by status
    const totalApplied = await Job.countDocuments({ userId, status: 'Applied' });
    const totalInterview = await Job.countDocuments({ userId, status: 'Interview' });
    const totalRejected = await Job.countDocuments({ userId, status: 'Rejected' });

    res.json({
      totalApplied,
      totalInterview,
      totalRejected,
      total: totalApplied + totalInterview + totalRejected
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

// FEATURE 2: Update notes for a job
export const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const job = await Job.findByIdAndUpdate(
      id,
      { notes },
      { new: true } // Return updated document
    );

    if (!job) return res.status(404).json({ error: "Job not found" });

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: "Failed to update notes" });
  }
};

// FEATURE 4: Set follow-up date
export const setFollowUpDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { followUpDate } = req.body;

    const job = await Job.findByIdAndUpdate(
      id,
      { followUpDate: followUpDate ? new Date(followUpDate) : null },
      { new: true }
    );

    if (!job) return res.status(404).json({ error: "Job not found" });

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: "Failed to set follow-up date" });
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

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const job = await Job.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!job) return res.status(404).json({ error: "Job not found" });

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: "Failed to update job" });
  }
};

export const getEnhancedStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    const totalApplied = await Job.countDocuments({ userId, status: 'Applied' });
    const totalInterview = await Job.countDocuments({ userId, status: 'Interview' });
    const totalOffer = await Job.countDocuments({ userId, status: 'Offer' });
    const totalRejected = await Job.countDocuments({ userId, status: 'Rejected' });
    const total = totalApplied + totalInterview + totalOffer + totalRejected;

    const appliedToInterview = totalApplied > 0 ? ((totalInterview / totalApplied) * 100).toFixed(1) : 0;
    const interviewToOffer = totalInterview > 0 ? ((totalOffer / totalInterview) * 100).toFixed(1) : 0;
    const overallSuccess = total > 0 ? ((totalOffer / total) * 100).toFixed(1) : 0;

    res.json({
      totalApplied,
      totalInterview,
      totalOffer,
      totalRejected,
      total,
      funnel: {
        appliedToInterview: parseFloat(appliedToInterview),
        interviewToOffer: parseFloat(interviewToOffer),
        overallSuccess: parseFloat(overallSuccess)
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch enhanced stats" });
  }
};

export const getFollowUps = async (req, res) => {
  try {
    const userId = req.user.userId;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const needsFollowUp = await Job.find({
      userId,
      status: { $in: ['Applied', 'Interview'] },
      updatedAt: { $lt: sevenDaysAgo }
    }).sort({ updatedAt: 1 });

    res.json(needsFollowUp);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch follow-ups" });
  }
};

export const getResumeStats = async (req, res) => {
  try {
    const userId = req.user.userId;
    const jobs = await Job.find({ userId });

    const resumeStats = {};

    jobs.forEach(job => {
      const resume = job.resumeVersion || 'Default';
      if (!resumeStats[resume]) {
        resumeStats[resume] = {
          total: 0,
          applied: 0,
          interview: 0,
          offer: 0,
          rejected: 0
        };
      }

      resumeStats[resume].total++;
      const statusKey = job.status.toLowerCase();
      if (resumeStats[resume][statusKey] !== undefined) {
        resumeStats[resume][statusKey]++;
      }
    });

    Object.keys(resumeStats).forEach(resume => {
      const stats = resumeStats[resume];
      stats.interviewRate = stats.total > 0 ? ((stats.interview / stats.total) * 100).toFixed(1) : 0;
      stats.offerRate = stats.total > 0 ? ((stats.offer / stats.total) * 100).toFixed(1) : 0;
      stats.interviewRate = parseFloat(stats.interviewRate);
      stats.offerRate = parseFloat(stats.offerRate);
    });

    res.json(resumeStats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resume stats" });
  }
};
