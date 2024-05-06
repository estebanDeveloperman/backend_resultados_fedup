import Period from "../../models/models_fase/PeriodModel.js";

export const getPeriodByMatch = async (req, res) => {
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
        idmatch: req.params.idmatch,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPeriod = async (req, res) => {
  const detailData = req.body;

  try {
    const nuevosDetails = await Period.bulkCreate(detailData);
    res.status(201).json(nuevosDetails);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// export const updatePeriod = async (req, res) => {
//   const { idperiod, puntos1, puntos2 } = req.body;

//   try {
//     const response = await Period.update(
//       {
//         puntos1,
//         puntos2,
//       },
//       {
//         where: {
//           idperiod: idperiod,
//         },
//       }
//     );

//     res.status(200).json({
//       msg: "Periodo Actualizado!",
//     });
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// };
export const updatePeriod = async (req, res) => {
  const detailData = req.body;

  try {
    let idmatch;

    for (const data of detailData) {
      const { matchId, idperiod, puntos1, puntos2, minutes } = data;

      idmatch = matchId;

      await Period.update(
        {
          puntos1,
          puntos2,
          minutes
        },
        {
          where: {
            idperiod: idperiod,
          },
        }
      );
    }

    const updatePeriods = await Period.findAll({
      where: {
        idmatch: idmatch,
      },
    });

    res.status(200).json(updatePeriods);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
