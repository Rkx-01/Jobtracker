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
        enum: ["Applied", "Interview", "Offer", "Rejected"],
        default: "Applied",
    },
    createdAt: { type: Date, default: Date.now },

    notes: {
        type: String,
        default: ""
    },

    followUpDate: {
        type: Date,
        default: null
    },

    resumeVersion: {
        type: String,
        default: "Default"
    },

    statusHistory: {
        type: [{
            status: {
                type: String,
                enum: ["Applied", "Interview", "Offer", "Rejected"],
            },
            date: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    }
});

jobSchema.pre('save', async function () {
    if (this.isNew) {
        this.statusHistory = [{
            status: this.status,
            date: this.createdAt || new Date()
        }];
    } else if (this.isModified('status')) {
        this.statusHistory.push({
            status: this.status,
            date: new Date()
        });
    }
});

export default mongoose.model("Job", jobSchema);
