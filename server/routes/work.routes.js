import { getAllWork, getUserWork, saveWork, saveRating } from '../controllers/work.controller.js';
import express from "express";

const router = express.Router();

router.get("/getAllWork", async (req, res, next) => {
    const allWork = await getAllWork();
    res.send(allWork);
});

router.post("/getUserWork", async (req, res, next) => {
    const userWork = await getUserWork(req);
    res.send(userWork);
});

router.post("/saveWork", async (req, res, next) => {
    const isWorkSaved = await saveWork(req);
    res.send(isWorkSaved);
});

router.post("/rating", async (req, res, next) => {
    const isRatingSaved = await saveRating(req);
    res.send(isRatingSaved);
})

export default router;