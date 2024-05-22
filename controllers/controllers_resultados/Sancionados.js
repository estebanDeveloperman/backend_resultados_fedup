import Sancionado from "../../models/models_resultados/SancionesModel.js";
import { Op } from "sequelize";

export const getSancionadoByPhase = async (req, res) => {
  const { idphase, nrofecha } = req.query;
  try {
    const response = await Sancionado.findAll({
      attributes: [
        "idsancionado",
        "nrofecha",
        "photo",

        "persona",
        "firstname",
        "lastname",
        "surname",

        "elofide",
        "business",
        "abrev",
        "image_path",
        "idperson",
        "docnumber",
        "idsport",
        "iduni",
        "idchampionship",
        "idphase",

        "idtarjeta",
        "nombre_tarjeta",
        "abrev_tarjeta",
        "fechassuspendido",

        "parametro1",
        "parametro2",
      ],
      where: {
        idphase: idphase,
        nrofecha: nrofecha !== undefined ? nrofecha : { [Op.ne]: null },
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createSancionados = async (req, res) => {
  const detailData = req.body;

  try {
    const nuevosDetails = await Sancionado.bulkCreate(detailData);
    res.status(201).json(nuevosDetails);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
