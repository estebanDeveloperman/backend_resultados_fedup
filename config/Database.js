import { Sequelize } from "sequelize";

// codigo para producción
// const db = new Sequelize({
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   dialect: "mysql",
//   port: process.env.DB_PORT,
//   host: process.env.DB_HOST,
// });

// codigo para desarrollo
const db = new Sequelize(
  "db_fedup_oficial_sistema_resultados",
  "root",
  "root123",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default db;
