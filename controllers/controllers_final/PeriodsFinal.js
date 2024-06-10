import PeriodFinal from "../../models/models_final/PeriodFinalModel.js";

export const getPeriodFinalByMatchup = async (req, res) => {
  try {
    const response = await PeriodFinal.findAll({
      attributes: [
        "idperiodfinal",
        "idmatchup",
        "dateOrder",
        "nroPeriodo",
        "puntos1",
        "puntos2",
        "idcompetitor1",
        "idcompetitor2",
        "idsport",
        "minutes",
        "idfecha",
        "idphase",
      ],
      where: {
        idmatchup: req.params.idmatchup,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPeriodFinal = async (req, res) => {
  const detailData = req.body;

  try {
    const nuevosDetails = await PeriodFinal.bulkCreate(detailData);
    res.status(201).json(nuevosDetails);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updatePeriodFinal = async (req, res) => {
  const detailData = req.body;

  try {
    let idmatchup;

    for (const data of detailData) {
      const {
        matchupId,
        idperiodfinal,
        puntos1,
        puntos2,
        minutes,
        idcompetitor1,
        idcompetitor2,
      } = data;

      idmatchup = matchupId;

      await PeriodFinal.update(
        {
          puntos1,
          puntos2,
          minutes,
          idcompetitor1,
          idcompetitor2,
        },
        {
          where: {
            idperiodfinal: idperiodfinal,
          },
        }
      );
    }

    const updatePeriodsFinal = await PeriodFinal.findAll({
      where: {
        idmatchup: idmatchup,
      },
    });

    res.status(200).json(updatePeriodsFinal);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
