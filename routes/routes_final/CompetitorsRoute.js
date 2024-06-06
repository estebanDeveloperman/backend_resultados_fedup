import express from "express";

import {
  getCompetitorByPhase,
  createCompetitors,
  createCompetitor,
} from "../../controllers/controllers_final/Competitors.js";

const router = express.Router();

router.post("/competitors", getCompetitorByPhase);

router.post("/create_competitor", createCompetitor);
router.post("/create_competitors", createCompetitors);

export default router;
