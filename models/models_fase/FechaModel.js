import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

import Phase from "../PhaseModel.js";

const { DataTypes } = Sequelize;

const Fecha = db.define("fecha", {
  idfecha: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  nroFecha: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fecha: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  groupLetter: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  idevent: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  idsport: {
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
});

Phase.hasMany(Fecha);
Fecha.belongsTo(Phase, { foreignKey: "idphase" });

export default Fecha;
