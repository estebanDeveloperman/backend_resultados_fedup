import express from "express";
import {
  getCategoriesByChampionship,
  createCategory,
  getCategorieById,
} from "../controllers/Categories.js";

const router = express.Router();

router.get("/categorie", getCategorieById);
router.get("/categories", getCategoriesByChampionship);
router.post("/categories", createCategory);

export default router;
