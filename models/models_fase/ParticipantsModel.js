import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Phase from "../PhaseModel.js";

const { DataTypes } = Sequelize;

const Participant = db.define(
  "participant",
  {
    idparticipant: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    positionP: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    denominationP: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    idchampionship: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    idcategory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    idphase: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    idinstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
  },
  {
    // freezeTableName: true
  }
);

Phase.hasMany(Participant);
Participant.belongsTo(Phase, { foreignKey: "idphase" });

export default Participant;
