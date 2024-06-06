import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

import Phase from "../PhaseModel.js";

const { DataTypes } = Sequelize;

const Matchups = db.define("matchups", {
  idmatchup: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  // fase final
  codigo_match: {
    type: DataTypes.STRING(5),
    allowNull: true,
  },
  etapa: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  direccion: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  // --> nrofecha
  dateOrder: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  tag_etapa: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  tag_matchup: {
    type: DataTypes.STRING(128),
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
  codigo_relacionado1: {
    type: DataTypes.STRING(5),
    allowNull: true,
  },
  codigo_relacionado2: {
    type: DataTypes.STRING(5),
    allowNull: true,
  },

  // datos para la programación de fechas
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
  statusDB: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  },
  idphase: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  idchampionship: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  idsport: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  idtypephase: {
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

  flagDraw: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },

  flagResultados: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  flagGoleadores: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  flagSanciones: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
});

Phase.hasMany(Matchups);
Matchups.belongsTo(Phase, { foreignKey: "idphase" });

export default Matchups;
