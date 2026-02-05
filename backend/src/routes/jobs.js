import express from "express";
import { parseAndAddJob, getJobs, deleteJob } from "../controllers/job.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes here are protected
router.use(authMiddleware);

router.post("/parse", parseAndAddJob);
router.get("/", getJobs);
router.delete("/:id", deleteJob);

export default router;
