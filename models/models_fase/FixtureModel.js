import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

import Phase from "../PhaseModel.js";

const { DataTypes } = Sequelize;

const Fixtures = db.define(
  "fixture",
  {
    idfixture: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    idgroup1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idgroup2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idparticipant1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idparticipant2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    orderGroup1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    orderGroup2: {
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
    idphase: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    statusDB: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    groupAsciiLetter1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    groupAsciiLetter2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    // freezeTableName: true,
  }
);

Phase.hasMany(Fixtures);
Fixtures.belongsTo(Phase, { foreignKey: "idphase" });

export default Fixtures;
