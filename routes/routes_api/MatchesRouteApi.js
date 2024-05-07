import express from "express";
import { getMatchesByPhaseApi } from "../../controllers/controllers_api/MatchesApi.js";

const router = express.Router();

router.get("/matchapi", getMatchesByPhaseApi);

export default router;
