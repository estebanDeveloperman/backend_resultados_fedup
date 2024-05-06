import express from "express";
import {
  getChampionships,
  getChampionshipById,
  createChampionship,
  getChampionshipByPeriod,
} from "../controllers/Championships.js";

const router = express.Router();

router.get("/championships", getChampionships);
router.get("/championships/period", getChampionshipByPeriod);
router.get("/championships/:id", getChampionshipById);
router.post("/championships", createChampionship);


export default router;
