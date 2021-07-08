import { getPreference, savePreference } from '../controllers/preference.controller.js';
import express from "express";

const router = express.Router();

router.post("/getPreference", async (req, res, next) => {
    const userPreference = await getPreference(req);
    res.send(userPreference);
});

router.post("/savePreference", async (req, res, next) => {
    const isPreferenceSaved = await savePreference(req);
    res.send(isPreferenceSaved);
});

export default router;