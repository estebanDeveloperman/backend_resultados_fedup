import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

import Phase from "../PhaseModel.js";

const { DataTypes } = Sequelize;

const Athlete = db.define(
  "athlete",
  {
    idathlete: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    pointstotales: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    firstname: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    surname: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    persona: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    doctype: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    docnumber: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    edad: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    email1: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    idsport: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sport: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    studentcode: {
      type: DataTypes.STRING(32),
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
    birthday: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    idinstitution: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nrocamiseta: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    idphase: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idmatch: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idparticipant: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    team: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idperson: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    // freezeTableName: true,
  }
);

Phase.hasMany(Athlete);
Athlete.belongsTo(Phase, { foreignKey: "idphase" });

export default Athlete;
