import Goleadores from "../../models/models_resultados/GoleadoresModel.js";
export const getGoleadoresByPhase = async (req, res) => {
  const { idphase } = req.query;
  try {
    const response = await Goleadores.findAll({
      attributes: [
        "idgoleador",
        "nrofecha",
        "photo",
        "persona",
        "elofide",
        "business",
        "abrev",
        "image_path",
        "points",
        "idperson",
        "idsport",
        "idphase",
        "parametro1",
        "parametro2",
      ],
      where: {
        idphase: idphase,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createGoleadores = async (req, res) => {
  const detailData = req.body;

  try {
    const nuevosDetails = await Goleadores.bulkCreate(detailData);
    res.status(201).json(nuevosDetails);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
