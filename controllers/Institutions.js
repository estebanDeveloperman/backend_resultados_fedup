import { QueryTypes } from 'sequelize';
import db from "../config/Database.js";

export const getInstitutions = async (req, res) => {
  try {
    const resultados = await db.query('SELECT * FROM institution', {
      type: QueryTypes.SELECT
    });
    // console.log(resultados);
    return res.status(200).json(resultados)
  } catch (error) {
    console.error('Error al consultar los datos:', error);
  }
};
