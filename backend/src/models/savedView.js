import mongoose from "mongoose";

const savedViewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    filters: {
        status: String,
        searchQuery: String,
        sortOrder: String
    }
}, { timestamps: true });

export default mongoose.model("SavedView", savedViewSchema);
