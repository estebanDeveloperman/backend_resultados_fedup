import Escenario from "../models/EscenarioModel.js";

export const getEscenarios = async (req, res) => {
  const region = req.query.region;
  try {
    const response = await Escenario.findAll({
      attributes: [
        "idescenario",
        "nombre",
        "direccion",
        "idregion",
        "nombreregion",
      ],
      where: {
        nombreregion: region,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createEscenario = async (req, res) => {
  const { nombre, direccion, idregion, nombreregion } = req.body;
  try {
    await Escenario.create({
      nombre: nombre,
      direccion: direccion,
      idregion: idregion,
      nombreregion: nombreregion,
    });
    res.status(201).json({ msg: "Registro Exitoso" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
