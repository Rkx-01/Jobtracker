import express from "express"
import { addEmail } from "../controllers/job.controller.js"

const router = express.Router()

router.post("/parse", addEmail)

export default router
