import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Escenario = db.define(
  "escenario",
  {
    idescenario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      validate: {
        notEmpty: true,
      },
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idregion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nombreregion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // freezeTableName: true,
  }
);

export default Escenario;
