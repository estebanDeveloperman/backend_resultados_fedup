import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Phase from "./PhaseModel.js"

const { DataTypes } = Sequelize;

const TypeCompetition = db.define("typecompetition", {
  idtypeCompetition: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 256],
    },
  },
});

export default TypeCompetition;
