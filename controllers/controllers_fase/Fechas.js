import Fecha from "../../models/models_fase/FechaModel.js";

export const getFecha = async (req, res) => {
  try {
    const response = await Fecha.findAll({
      attributes: [
        "idfecha",
        "nroFecha",
        "fecha",
        "groupLetter",
        "idevent",
        "idsport",
        "idphase",
        "statusDB",
      ],
      where: {
        idphase: req.params.idphase,
        statusDB: true,
      },
    });
    if (response.length === 0) {
      res.status(204).send();
      return;
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createFechas = async (req, res) => {
  const detailData = req.body;

  // aplanar array
  const detailDataAplanado = [].concat(...detailData);

  try {
    const nuevosDetails = await Fecha.bulkCreate(detailDataAplanado);
    res.status(201).json(nuevosDetails);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateStatus = async (req, res) => {
  let idphase = req.body.idphase;
  try {
    await GroupsTable.update(
      {
        statusDB: false,
      },
      {
        where: {
          idphase: idphase,
        },
      }
    );
    res.status(200).json({ msg: "Status de fechas actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateFechaById = async (req, res) => {
  const groupCell = await Fecha.findOne({
    where: {
      idfecha: req.params.id,
    },
  });
  if (!groupCell)
    return res.status(404).json({ msg: "Registro de fecha no encontrado" });

  const { fecha } = req.body;

  try {
    await Fecha.update(
      {
        fecha: fecha,
      },
      {
        where: {
          idfecha: groupCell.idfecha,
        },
      }
    );
    res.status(200).json({ msg: "Fecha Cell Actualizado!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
