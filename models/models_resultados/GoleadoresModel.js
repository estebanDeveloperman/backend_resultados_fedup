import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

import Phase from "../PhaseModel.js";

const { DataTypes } = Sequelize;

const Goleadores = db.define("goleadores", {
  idgoleador: {
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
  nrofecha: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  photo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  persona: {
    // persona
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  firstname: {
    // firstname
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  lastname: {
    // lastname
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  surname: {
    // surname
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  elofide: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  business: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  abrev: {
    type: DataTypes.STRING(128),
    allowNull: true,
  },
  image_path: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  idperson: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  docnumber: {
    type: DataTypes.STRING(64),
    allowNull: true,
  },
  idsport: { type: DataTypes.INTEGER, allowNull: true },
  idchampionship: { type: DataTypes.INTEGER, allowNull: true },
  iduni: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  idphase: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  parametro1: {
    // lastname
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  parametro2: {
    // surname
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});

Phase.hasMany(Goleadores);
Goleadores.belongsTo(Phase, { foreignKey: "idphase" });

export default Goleadores;
