import express from "express";
import { parseAndAddJob, getJobs, deleteJob, getStats, updateNotes, setFollowUpDate, updateJob, getEnhancedStats, getFollowUps, getResumeStats } from "../controllers/job.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/stats", getStats);
router.get("/enhanced-stats", getEnhancedStats);
router.get("/follow-ups", getFollowUps);
router.get("/resume-stats", getResumeStats);

router.post("/parse", parseAndAddJob);
router.get("/", getJobs);

router.patch("/:id", updateJob);
router.patch("/:id/notes", updateNotes);
router.patch("/:id/followup", setFollowUpDate);
router.delete("/:id", deleteJob);

export default router;
