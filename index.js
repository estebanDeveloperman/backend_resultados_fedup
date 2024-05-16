import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";

// import routes
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import ChampionshipRoute from "./routes/ChampionshipRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import PhaseRoute from "./routes/PhaseRoute.js";
import TypeCompetitionRoute from "./routes/TypeCompetitionRoute.js";
import InsitutionsRoute from "./routes/InstitutionRoute.js";
import ParticipantRoute from "./routes/routes_fase/ParticipantRoute.js";
import GroupRoute from "./routes/routes_fase/GroupsRoute.js";
import FixtureRoute from "./routes/routes_fase/FixtureRoute.js";
import FechaRoute from "./routes/routes_fase/FechaRoute.js";
import MatchRoute from "./routes/routes_fase/MatchRoute.js";
import PeriodRoute from "./routes/routes_fase/PeriodRoute.js";
import ResultRoute from "./routes/routes_resultados/ResultRoute.js";
import PositionRoute from "./routes/routes_resultados/PositionRoute.js";
import GroupConfigRoute from "./routes/routes_fase/GroupsConfigRoute.js"

// api
import PositionApiRoute from "./routes/routes_api/PositionApiRoute.js";
import FechaApiRoute from "./routes/routes_api/FechaRouteApi.js";
import MatchApiRoute from "./routes/routes_api/MatchesRouteApi.js";

import { PORT } from "./config.js";

// configuraciones
dotenv.config();
const app = express();
app.set("trust proxy", 1);
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//    await db.sync();
//  })();

// codigo para produccion
app.use(
  session({
    secret: "tiwiisgonnabeaking123912898932",
    resave: false,
    saveUninitialized: true,
    store: store,
    proxy: true,
    name: "MyCoolWebAppCookieName",
    cookie: {
      secure: true,
      sameSite: "none",
    },
  })
);

// store.sync();

// codigo para desarrollo
// app.use(
//   session({
//     secret: process.env.SESS_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: store,
//     cookie: {
//       secure: "auto",
//     },
//   })
// );

app.use(
  cors({
    credentials: true,
    // origin: "http://localhost:3000",
    origin: "*",
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
  })
);

app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(ChampionshipRoute);
app.use(CategoryRoute);
app.use(PhaseRoute);
app.use(TypeCompetitionRoute);
app.use(InsitutionsRoute);
app.use(ParticipantRoute);
app.use(GroupRoute);
app.use(FixtureRoute);
app.use(FechaRoute);
app.use(MatchRoute);
app.use(PeriodRoute);
app.use(ResultRoute);
app.use(PositionRoute);
app.use(PositionApiRoute);
app.use(FechaApiRoute);
app.use(MatchApiRoute);
app.use(GroupConfigRoute)
// store.sync();

app.listen(PORT, () => {
  console.log("Servidor levantado en el puerto", PORT);
});
