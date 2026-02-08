import express from "express";
import { parseAndAddJob, getJobs, deleteJob, getStats, updateNotes, setFollowUpDate } from "../controllers/job.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes here are protected
router.use(authMiddleware);

// IMPORTANT: Specific routes MUST come before parameterized routes
// Otherwise Express will treat "stats" as an :id parameter

// Feature 3: Analytics (must be before /:id routes)
router.get("/stats", getStats);

// Existing routes
router.post("/parse", parseAndAddJob);
router.get("/", getJobs); // Supports ?search=&status=&sort= query params

// Feature 2 & 4: Notes and Follow-up (parameterized routes)
router.patch("/:id/notes", updateNotes);
router.patch("/:id/followup", setFollowUpDate);
router.delete("/:id", deleteJob);

export default router;
