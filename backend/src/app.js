import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import jobRoutes from "./routes/jobs.js"

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://Rounak:RounakNST2024@cluster0.agyhrwz.mongodb.net/jobtracker?appName=Cluster0")

app.use("/jobs", jobRoutes)

app.listen(3000,()=>{
 console.log("Server running")
})
