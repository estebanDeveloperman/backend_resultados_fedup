import Result from "../../models/models_resultados/ResultModel.js";

export const getResultByMatch = async (req, res) => {
  try {
    const response = await Period.findAll({
      attributes: [
        "idresult",
        "idmatch",
        "groupAsciiLetter",
        "dateOrder",
        "nroMatch",
        "resultado1",
        "resultado2",
        "idgroup1",
        "idgroup2",
        "campus",
        "fecha",
        "idsport",
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

export const createResult = async (req, res) => {
  const detailData = req.body;

  try {
    const nuevosDetails = await Result.bulkCreate(detailData);
    res.status(201).json(nuevosDetails);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateResult = async (req, res) => {
  const { idresult, resultado1, resultado2, campus, fecha } = req.body;

  try {
    const response = await Result.update(
      {
        resultado1,
        resultado2,
        campus,
        fecha,
      },
      {
        where: {
          idresult: idresult,
        },
      }
    );

    res.status(200).json({
      msg: "Resultado Actualizado!",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
