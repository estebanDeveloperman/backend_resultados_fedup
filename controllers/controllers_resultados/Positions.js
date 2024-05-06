import Position from "../../models/models_resultados/PositionsModel.js";

export const getPositionByPhase = async (req, res) => {
  try {
    const response = await Position.findAll({
      attributes: [
        "idposition",
        "groupAsciiLetter",
        "idsport",
        "idgroup",
        "idparticipant",
        "business",
        "abrev",
        "nrofecha",
        "idfecha",

        "pts",
        "pj",
        "pg",
        "wo",
        "pp",

        "pf",
        "pe",
        "dp",
        "idphase",
      ],
      where: {
        idphase: req.params.idphase,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPositionByPhaseVoleibol = async (req, res) => {
  const { idphase, nrofecha } = req.query;
  try {
    const response = await Position.findAll({
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
        "idfecha",

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
        idphase: idphase,
        nrofecha: nrofecha
        // idphase: req.params.idphase,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPosition = async (req, res) => {
  const detailData = req.body;

  try {
    const nuevosDetails = await Position.bulkCreate(detailData);
    res.status(201).json(nuevosDetails);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updatePosition = async (req, res) => {
  const { idgroup, pts, pj, pg, wo, pp, pf, pe, dp } = req.body;

  try {
    const response = await Position.update(
      {
        pts,
        pj,
        pg,
        wo,
        pp,
        pf,
        pe,
        dp,
      },
      {
        where: {
          idgroup: idgroup,
        },
      }
    );

    res.status(200).json({
      msg: "Posicion Actualizada!",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updatePositionVoleibol = async (req, res) => {
  const {
    nrofecha,
    idgroup,
    pts,
    pj,
    pg,
    wo,
    pp,
    pf,
    pe,
    dp,
    pg2_0,
    pg2_1,
    pp2_0,
    pp2_1,
    setG,
    setP,
    setRatio,
    puntosRatio,
  } = req.body;
  console.log("datos", nrofecha, idgroup);
  try {
    const response = await Position.update(
      {
        pts,
        pj,
        pg,
        wo,
        pp,
        pf,
        pe,
        dp,
        pg2_0,
        pg2_1,
        pp2_0,
        pp2_1,
        setG,
        setP,
        setRatio,
        puntosRatio,
      },
      {
        where: {
          nrofecha: nrofecha,
          idgroup: idgroup,
        },
      }
    );

    res.status(200).json({
      msg: "Posicion Actualizada!",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
