import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

import Phase from "../PhaseModel.js";

const { DataTypes } = Sequelize;

const Matches = db.define(
  "matches",
  {
    idmatch: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    idfixture: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idgroup1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idgroup2: {
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
    ordenMatch: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    dateMatch: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    timeMatch: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    uniform1: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    uniform2: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    campus: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    resultado1: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    resultado2: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    sets1: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    sets2: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    idwinner: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idloser: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    flagConfirmado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    statusGame: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    parametro1: {
      type: DataTypes.STRING(125),
      allowNull: true,
    },
    parametro2: {
      type: DataTypes.STRING(125),
      allowNull: true,
    },
    statusDB: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },

    idfecha: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.STRING,
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
  {
    // freezeTableName: true,
  }
);

Phase.hasMany(Matches);
Matches.belongsTo(Phase, { foreignKey: "idphase" });

export default Matches;
