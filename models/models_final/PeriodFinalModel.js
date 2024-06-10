import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

import Phase from "../PhaseModel.js";

const { DataTypes } = Sequelize;

const PeriodFinal = db.define(
  "periodfinal",
  {
    idperiodfinal: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    idmatchup: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dateOrder: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nroPeriodo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    puntos1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    puntos2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idcompetitor1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idcompetitor2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idsport: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idfecha: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    minutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idphase: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {}
);

Phase.hasMany(PeriodFinal);
PeriodFinal.belongsTo(Phase, { foreignKey: "idphase" });

export default PeriodFinal;
