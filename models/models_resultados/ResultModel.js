import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

import Phase from "../PhaseModel.js";

const { DataTypes } = Sequelize;

const Result = db.define("result", {
  idresult: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  idmatch: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  groupAsciiLetter: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  dateOrder: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  nroMatch: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  resultado1: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  resultado2: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  idgroup1: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  idgroup2: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  campus: {
    type: DataTypes.STRING(128),
    allowNull: true,
  },
  fecha: {
    type: DataTypes.STRING(12),
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
  // statusDB: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: true,
  //   defaultValue: true,
  // },
  idphase: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Phase.hasMany(Result);
Result.belongsTo(Phase, { foreignKey: "idphase" });

export default Result;
