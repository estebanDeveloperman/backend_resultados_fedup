import Matchups from "../../models/models_final/MatchupModel.js";
import Competitor from "../../models/models_final/CompetitorModel.js";
import Period from "../../models/models_fase/PeriodModel.js";

export const updateStatusCodigo = async (req, res) => {
  const { idchampionship, idsport, idtypephase } = req.body;
  try {
    await Matchups.update(
      {
        statusDB: false,
      },
      {
        where: {
          idchampionship: idchampionship,
          idsport: idsport,
          idtypephase: idtypephase,
        },
      }
    );
    res.status(200).json({
      msg: "Status de matchups actualizado correctamente",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateStatus = async (req, res) => {
  let idphase = req.body.idphase;
  try {
    await Matchups.update(
      {
        statusDB: false,
      },
      {
        where: {
          idphase: idphase,
        },
      }
    );
    res.status(200).json({
      msg: "Status de matchups actualizado correctamente",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getMatchupById = async (req, res) => {
  try {
    const matchup = await Matchups.findOne({
      where: {
        idmatchup: req.params.id,
      },
    });
    if (!matchup)
      return res.status(404).json({
        msg: "Matchup no encontrado",
      });

    const response = await Matchups.findOne({
      attributes: [
        "idmatchup",
        "codigo_match",
        "etapa",
        "direccion",
        "dateOrder",
        "tag_etapa",
        "tag_matchup",
        "idparticipant1",
        "idparticipant2",
        "codigo_relacionado1",
        "codigo_relacionado2",

        "dateMatch",
        "timeMatch",
        "uniform1",
        "uniform2",
        "campus",
        "resultado1",
        "resultado2",
        "sets1",
        "sets2",
        "idwinner",
        "idloser",
        "flagConfirmado",
        "statusGame",

        "idphase",
        "idchampionship",
        "idsport",
        "idtypephase",
      ],
      where: {
        idmatch: matchup.idmatch,
        statusDB: true,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getPeriodByMatchup = async (idmatch) => {
  try {
    const response = await Period.findAll({
      attributes: [
        "idperiod",
        "idmatch",
        "groupAsciiLetter",
        "dateOrder",
        "nroPeriodo",
        "puntos1",
        "puntos2",
        "idgroup1",
        "idgroup2",
        "idsport",
        "minutes",
        "idfecha",
        "idphase",
      ],
      where: {
        idmatch: idmatch,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getMatchupsByPhase = async (req, res) => {
  const { idchampionship, idsport, idtypephase } = req.body;
  try {
    const response = await Matchups.findAll({
      attributes: [
        "idmatchup",
        "codigo_match",
        "etapa",
        "direccion",
        "dateOrder",
        "tag_etapa",
        "tag_matchup",
        "idcompetitor1",
        "idcompetitor2",
        "codigo_relacionado1",
        "codigo_relacionado2",

        "dateMatch",
        "timeMatch",
        "uniform1",
        "uniform2",
        "campus",
        "resultado1",
        "resultado2",
        "sets1",
        "sets2",
        "idwinner",
        "idloser",
        "flagConfirmado",
        "statusGame",

        "idphase",
        "idchampionship",
        "idsport",
        "idtypephase",
      ],
      where: {
        idchampionship: idchampionship,
        idsport: idsport,
        idtypephase: idtypephase,
        statusDB: true,
      },
    });

    if (response.length === 0) {
      return res.status(204).json([]); // Enviar un array vacío como respuesta
    }

    const responseMapeadoPromises = response.map(async (matchup) => {
      const matchupModificado = { ...matchup.toJSON() };

      const responseCompetitor1P = await Competitor.findOne({
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
          idcompetitor: matchupModificado.idcompetitor1,
        },
      });

      const responseCompetitor2P = await Competitor.findOne({
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
          idcompetitor: matchupModificado.idcompetitor2,
        },
      });

      const [responseCompetitor1, responseCompetitor2, responsePeriodos] =
        await Promise.all([
          responseCompetitor1P,
          responseCompetitor2P,
          getPeriodByMatchup(matchupModificado.idmatchup),
        ]);

      matchupModificado.fighterId1 = responseCompetitor1;
      matchupModificado.fighterId2 = responseCompetitor2;
      matchupModificado.periods = responsePeriodos;

      return matchupModificado;
    });

    const responseMapeado = await Promise.all(responseMapeadoPromises);

    res.status(200).json(responseMapeado);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMatchupsByNroDate = async (req, res) => {
  const { idchampionship, idsport, idtypephase, dateOrder } = req.query;
  try {
    const response = await Matchups.findAll({
      attributes: [
        "idmatchup",
        "codigo_match",
        "etapa",
        "direccion",
        "dateOrder",
        "tag_etapa",
        "tag_matchup",
        "idparticipant1",
        "idparticipant2",
        "codigo_relacionado1",
        "codigo_relacionado2",

        "dateMatch",
        "timeMatch",
        "uniform1",
        "uniform2",
        "campus",
        "resultado1",
        "resultado2",
        "sets1",
        "sets2",
        "idwinner",
        "idloser",
        "flagConfirmado",
        "statusGame",

        "idphase",
        "idchampionship",
        "idsport",
        "idtypephase",
      ],
      where: {
        idchampionship: idchampionship,
        idsport: idsport,
        idtypephase: idtypephase,
        dateOrder: dateOrder,
        statusDB: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createMatchups = async (req, res) => {
  const detailData = req.body;
  try {
    const nuevosDetails = await Matches.bulkCreate(detailData);
    res.status(201).json(nuevosDetails);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const createMatchup = async (req, res) => {
  const {
    codigo_match,
    etapa,
    direccion,
    dateOrder,
    tag_etapa,
    tag_matchup,
    idcompetitor1,
    idcompetitor2,
    codigo_relacionado1,
    codigo_relacionado2,
    dateMatch,
    timeMatch,
    uniform1,
    uniform2,
    campus,
    resultado1,
    resultado2,
    sets1,
    sets2,
    idwinner,
    idloser,
    flagConfirmado,
    statusGame,
    idphase,
    idchampionship,
    idsport,
    idtypephase,
    parametro1,
    parametro2,
  } = req.body;

  try {
    const response = await Matchups.create({
      codigo_match,
      etapa,
      direccion,
      dateOrder,
      tag_etapa,
      tag_matchup,
      idcompetitor1,
      idcompetitor2,
      codigo_relacionado1,
      codigo_relacionado2,
      dateMatch,
      timeMatch,
      uniform1,
      uniform2,
      campus,
      resultado1,
      resultado2,
      sets1,
      sets2,
      idwinner,
      idloser,
      flagConfirmado,
      statusGame,
      idphase,
      idchampionship,
      idsport,
      idtypephase,
      parametro1,
      parametro2,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateMatchups = async (req, res) => {
  const matchup = await Matchups.findOne({
    where: {
      idmatchup: req.params.id,
    },
  });
  if (!matchup) return res.status(404).json({ msg: "Matchup no encontrado" });

  const {
    dateMatch,
    timeMatch,
    uniform1,
    uniform2,
    campus,
    resultado1,
    resultado2,
    sets1,
    sets2,
    idwinner,
    idloser,
    flagDraw,
    flagConfirmado,
    parametro1,
    parametro2,
  } = req.body;

  try {
    const response = await Matchups.update(
      {
        dateMatch: dateMatch,
        timeMatch: timeMatch,
        uniform1: uniform1,
        uniform2: uniform2,
        campus: campus,
        resultado1: resultado1,
        resultado2: resultado2,
        sets1: sets1,
        sets2: sets2,
        idwinner: idwinner,
        idloser: idloser,
        flagDraw: flagDraw,
        flagConfirmado: flagConfirmado,
        parametro1: parametro1,
        parametro2: parametro2,
      },
      {
        where: {
          idmatchup: matchup.idmatchup,
        },
      }
    );

    const updatedMatchupd = await Matchups.findOne({
      where: {
        idmatchup: matchup.idmatchup,
      },
    });
    res.status(200).json(updatedMatchupd);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
