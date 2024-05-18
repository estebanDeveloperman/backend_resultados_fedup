import Participant from "../../models/models_fase/ParticipantsModel.js";
import Category from "../../models/CategoryModel.js";
import Championship from "../../models/ChampionshipModel.js";
import Phase from "../../models/PhaseModel.js";

import db from "../../config/Database.js";
import { QueryTypes } from "sequelize";

export const getParticipantsByPhase = async (req, res) => {
  const { phase } = req.query;
  try {
    const response = await Participant.findAll({
      attributes: [
        "idparticipant",
        "positionP",
        "denominationP",
        "idchampionship",
        "idcategory",
        "idphase",
        "idinstitution",
        "business",
        "abrev",
        "image_path",
        "pais",
        "bandera"
      ],
      where: {
        idphase: phase,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createParticipant = async (req, res) => {
  const participantsData = req.body;

  try {
    // Insertar todos los participantes en una sola operación
    const nuevosParticipantes = await Participant.bulkCreate(participantsData);

    res.status(201).json({
      msg: "Registros Exitosos",
      nuevosParticipantes: nuevosParticipantes,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message }); // Respuesta de error
  }
};

export const updateParticipant = async (req, res) => {
  const participantData = req.body;

  try {
    for (const data of participantData) {
      const { idparticipant, positionP, denominationP } = data;

      await Participant.update(
        {
          positionP: positionP,
          denominationP: denominationP,
        },
        {
          where: {
            idparticipant: idparticipant,
          },
        }
      );
    }

    res.status(200).json({ msg: "Actualización exitosa" }); // Respuesta exitosa
  } catch (error) {
    res.status(400).json({ msg: error.message }); // Respuesta de error
  }
};
