import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    company: { type: String, required: true },
    role: { type: String, default: "Unknown Role" },
    status: {
        type: String,
        enum: ["Applied", "Interview", "Rejected"],
        default: "Applied",
    },
    createdAt: { type: Date, default: Date.now },

    // NEW FIELDS FOR ENHANCED FEATURES

    // Feature 2: Notes per job
    notes: {
        type: String,
        default: ""
    },

    // Feature 4: Follow-up reminders
    followUpDate: {
        type: Date,
        default: null
    },

    // Feature 5: Status timeline/history
    statusHistory: {
        type: [{
            status: {
                type: String,
                enum: ["Applied", "Interview", "Rejected"],
            },
            date: {
                type: Date,
                default: Date.now
            }
        }],
        default: [] // Initialize as empty array
    }
});

// Automatically initialize statusHistory when job is created
// Using async function (modern Mongoose)
jobSchema.pre('save', async function () {
    // Only add to history if this is a new document and history is empty
    if (this.isNew && (!this.statusHistory || this.statusHistory.length === 0)) {
        this.statusHistory = [{
            status: this.status,
            date: this.createdAt || new Date()
        }];
    }
});

export default mongoose.model("Job", jobSchema);
