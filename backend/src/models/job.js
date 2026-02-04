import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
 company:String,
 role:String,
 status:String,
 date:Date
})

export default mongoose.model("Job",jobSchema)
