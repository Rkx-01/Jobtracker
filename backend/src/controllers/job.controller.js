import Job from "../models/job.js"
import { parseEmail } from "../services/parser.service.js"

export async function addEmail(req, res) {
  const { emailText } = req.body

  const parsed = parseEmail(emailText)

  const job = await Job.create(parsed)

  res.json(job)
}
