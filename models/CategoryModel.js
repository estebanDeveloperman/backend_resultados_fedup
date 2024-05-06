import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Championship from "./ChampionshipModel.js";

const { DataTypes } = Sequelize;

const Category = db.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    idsport: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 128],
      },
    },
    acronym: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 64],
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    logo_path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 256],
      },
    },
    // Relación de uno a muchos con Championship
    // Un campeonato puede tener muchas categorías
    // Esta columna será agregada automáticamente por Sequelize
    idchampionship: {
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

// Definición de la relación con Championship
Championship.hasMany(Category);
Category.belongsTo(Championship, { foreignKey: "idchampionship" });

export default Category;
