import Championship from "../models/ChampionshipModel.js";

export const getChampionships = async (req, res) => {
  try {
    const response = await Championship.findAll({
      attributes: [
        "idchampionship",
        "name",
        "startdate",
        "enddate",
        "place",
        "period",
        "logo_path",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getChampionshipById = async (req, res) => {
  try {
    const response = await Championship.findOne({
      attributes: [
        "idchampionship",
        "name",
        "startdate",
        "enddate",
        "place",
        "period",
        "logo_path",
      ],
      where: {
        idchampionship: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getChampionshipByPeriod = async (req, res) => {
  const { period } = req.query;
  try {
    const response = await Championship.findAll({
      attributes: [
        "idchampionship",
        "name",
        "startdate",
        "enddate",
        "place",
        "period",
        "logo_path",
      ],
      where: {
        period: period,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createChampionship = async (req, res) => {
  const { idchampionship, name, startdate, enddate, place, period, logo_path } =
    req.body;
  try {
    const existingChampionship = await Championship.findOne({ idchampionship });

    if (existingChampionship) {
      return res
        .status(400)
        .json({ msg: "Ya creaste este campeonato" });
    }

    await Championship.create({
      idchampionship: idchampionship,
      name: name,
      startdate: startdate,
      enddate: enddate,
      place: place,
      period: period,
      logo_path: logo_path,
    });
    res.status(201).json({ msg: "Registro Exitoso" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
