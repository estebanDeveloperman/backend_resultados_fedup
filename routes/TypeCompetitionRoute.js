import express from "express"

import {getTypeCompetition} from "../controllers/TypeCompetition.js"

const router = express.Router()

router.get("/typecompetition", getTypeCompetition)

export default router