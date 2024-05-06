import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

import Phase from "../PhaseModel.js";

const { DataTypes } = Sequelize;

const Position = db.define("position", {
  idposition: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  groupAsciiLetter: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  idsport: { type: DataTypes.INTEGER, allowNull: true },
  idgroup: { type: DataTypes.INTEGER, allowNull: true },
  idparticipant: { type: DataTypes.INTEGER, allowNull: true },
  business: { type: DataTypes.STRING(255), allowNull: true },
  image_path: { type: DataTypes.STRING(255), allowNull: true },
  abrev: { type: DataTypes.STRING(64), allowNull: true },
  nrofecha: { type: DataTypes.INTEGER, allowNull: true },
  idfecha: { type: DataTypes.INTEGER, allowNull: true },

  pts: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  pj: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  pg: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  wo: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  pp: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },

  pf: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  pe: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  dp: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },

  pg2_0: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  pg2_1: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  pp2_0: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  pp2_1: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },

  setG: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  setP: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  setRatio: {
    type: DataTypes.DECIMAL(10, 3),
    allowNull: true,
    defaultValue: 0,
  },
  puntosRatio: {
    type: DataTypes.DECIMAL(10, 3),
    allowNull: true,
    defaultValue: 0,
  },

  idphase: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Phase.hasMany(Position);
Position.belongsTo(Phase, { foreignKey: "idphase" });

export default Position;
