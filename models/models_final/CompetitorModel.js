import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Phase from "../PhaseModel.js";

const { DataTypes } = Sequelize;

const Competitor = db.define("competitor", {
  idcompetitor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  positionPlayer: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  groupLetter: {
    type: DataTypes.STRING(5),
    allowNull: true,
  },

  iduni: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  business: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  abrev: {
    type: DataTypes.STRING(64),
    allowNull: true,
  },
  image_path: {
    type: DataTypes.STRING(255),
    allowNull: true,
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
  idphase: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  pais: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  bandera: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});

Phase.hasMany(Competitor);
Competitor.belongsTo(Phase, { foreignKey: "idphase" });

export default Competitor;
