import express from "express";
import { getPositionsByApi } from "../../controllers/controllers_api/PositionApi.js";

const router = express.Router();

router.get("/positionsapi", getPositionsByApi);

export default router;
