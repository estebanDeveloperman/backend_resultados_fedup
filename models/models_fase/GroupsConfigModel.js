import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

import Phase from "../PhaseModel.js";

const { DataTypes } = Sequelize;

const GroupsConfig = db.define(
  "groupconfig",
  {
    idgroupconfig: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    numberGroups: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numberRounds: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    setManually: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    setRandom: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    numberFilas: {
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
  {
    // freezeTableName: true,
  }
);

Phase.hasOne(GroupsConfig);
GroupsConfig.belongsTo(Phase, { foreignKey: "idphase" });

export default GroupsConfig;
