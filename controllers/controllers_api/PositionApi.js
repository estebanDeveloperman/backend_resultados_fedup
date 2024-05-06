import Position from "../../models/models_resultados/PositionsModel.js";
import Phase from "../../models/PhaseModel.js";
import Category from "../../models/CategoryModel.js";

export const getPositionsByApi = async (req, res) => {
  const { idevent, idsport, nrofecha } = req.query;

  try {
    const responseCategory = await Category.findOne({
      attributes: ["id", "idchampionship", "idsport"],
      where: {
        idchampionship: idevent,
        idsport: idsport,
      },
    });

    const responsePhase = await Phase.findAll({
      attributes: ["idphase", "idchampionship", "idcategory"],
      where: {
        idchampionship: idevent,
        idcategory: responseCategory.id,
      },
    });

    const responseData = responsePhase[0]; // la fase correspondiente
    const idPhase = responseData.idphase;

    const responsePosition = await Position.findAll({
      attributes: [
        "idposition",
        "groupAsciiLetter",
        "idsport",
        "idgroup",
        "idparticipant",
        "business",
        "image_path",
        "abrev",
        "nrofecha",

        "pts",
        "pj",
        "pg",
        "wo",
        "pp",

        "pf",
        "pe",
        "dp",

        "pg2_0",
        "pg2_1",
        "pp2_0",
        "pp2_1",

        "setG",
        "setP",
        "setRatio",
        "puntosRatio",

        "idphase",
      ],
      where: {
        idphase: idPhase,
        nrofecha: nrofecha,
      },
    });

    res.status(200).json(responsePosition);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
