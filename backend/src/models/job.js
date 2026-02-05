import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    company: { type: String, required: true },
    role: { type: String, default: "Unknown Role" }, // Default if not parsed
    status: {
        type: String,
        enum: ["Applied", "Interview", "Rejected"],
        default: "Applied",
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Job", jobSchema);
