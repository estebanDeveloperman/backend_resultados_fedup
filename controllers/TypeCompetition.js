import TypeCompetition from "../models/TypeCompetitionModel.js";

export const getTypeCompetition = async (req, res) => {
  try {
    const response = await TypeCompetition.findAll({
      attributes: ["idtypeCompetition", "name"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};