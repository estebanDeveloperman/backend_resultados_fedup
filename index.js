import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";

// import routes
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

// configuraciones
dotenv.config();
const app = express();
app.set("trust proxy", 1);
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

// codigo para produccion
// app.use(
//   session({
//     secret: "tiwiisgonnabeaking123912898932",
//     resave: false,
//     saveUninitialized: true,
//     store: store,
//     proxy: true,
//     name: "MyCoolWebAppCookieName",
//     cookie: {
//       secure: true,
//       sameSite: "none",
//     },
//   })
// );

// store.sync();

// codigo para desarrollo
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    //   origin: "https://winscore.perufedup.com",
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
  })
);

app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.PORT, () => {
  console.log("Servidor levantado en el puerto", process.env.PORT);
});
