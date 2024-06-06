import Competitor from "../../models/models_final/CompetitorModel.js";

export const getCompetitorByPhase = async (req, res) => {
  const { idchampionship, idsport, idtypephase } = req.body;
  try {
    const response = await Competitor.findAll({
      attributes: [
        "idcompetitor",
        "positionPlayer",
        "groupLetter",

        "iduni",
        "business",
        "abrev",
        "image_path",
        "idchampionship",
        "idsport",
        "idtypephase",
        "idphase",

        "pais",
        "bandera",
      ],
      where: {
        idchampionship: idchampionship,
        idsport: idsport,
        idtypephase: idtypephase,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCompetitors = async (req, res) => {
  const competitorsData = req.body;

  try {
    const nuevosCompetidores = await Competitor.bulkCreate(competitorsData);

    res.status(201).json({
      msg: "Registros Exitosos",
      nuevosCompetidores: nuevosCompetidores,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createCompetitor = async (req, res) => {
  const {
    positionPlayer,
    groupLetter,
    iduni,
    business,
    abrev,
    image_path,
    idchampionship,
    idsport,
    idtypephase,
    idphase,
  } = req.body;

  try {
    await Competitor.create({
      positionPlayer: positionPlayer,
      groupLetter: groupLetter,
      iduni: iduni,
      business: business,
      abrev: abrev,
      image_path: image_path,
      idchampionship: idchampionship,
      idsport: idsport,
      idtypephase: idtypephase,
      idphase: idphase,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
