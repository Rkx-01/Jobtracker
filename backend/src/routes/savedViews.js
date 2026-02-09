import express from "express";
import SavedView from "../models/savedView.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
    try {
        const views = await SavedView.find({ userId: req.user.userId });
        res.json(views);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch saved views" });
    }
});

router.post("/", async (req, res) => {
    try {
        const view = new SavedView({
            userId: req.user.userId,
            ...req.body
        });
        await view.save();
        res.status(201).json(view);
    } catch (error) {
        res.status(500).json({ error: "Failed to create saved view" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await SavedView.findByIdAndDelete(req.params.id);
        res.json({ message: "View deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete saved view" });
    }
});

export default router;
