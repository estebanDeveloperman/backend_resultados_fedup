import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

import Phase from "../../models/PhaseModel.js";

const { DataTypes } = Sequelize;

const Period = db.define(
  "period",
  {
    idperiod: {
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
    idgroup1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idgroup2: {
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
  },
  {}
);

Phase.hasMany(Period);
Period.belongsTo(Phase, { foreignKey: "idphase" });

export default Period;
