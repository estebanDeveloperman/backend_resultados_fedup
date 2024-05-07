import express from "express";
import { getMatchesByPhaseApi } from "../../controllers/controllers_api/FechasApi.js";

const router = express.Router();

router.get("/fecha", getMatchesByPhaseApi);

export default router;
