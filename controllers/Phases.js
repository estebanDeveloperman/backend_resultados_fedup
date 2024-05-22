import Phase from "../models/PhaseModel.js";
import Fixtures from "../models/models_fase/FixtureModel.js";
import Category from "../models/CategoryModel.js";

export const getFechas = async (req, res) => {
  const { idevent, idsport } = req.query;

  const responseCategory = await Category.findOne({
    attributes: ["id", "idchampionship", "idsport"],
    where: {
      idchampionship: idevent,
      idsport: idsport,
    },
  });

  const responsePhase = await Phase.findAll({
    attributes: ["idphase", "idchampionship", "idcategory"],
    where: {
      idchampionship: idevent,
      idcategory: responseCategory.id,
    },
  });
  const responseData = responsePhase[0]; // la fase correspondiente
  const idPhase = responseData.idphase;

  const response = await Fixtures.findAll({
    attributes: ["idfixture", "dateOrder", "idphase"],
    where: {
      idphase: idPhase,
      statusDB: true,
    },
  });

  const uniqueGroupAsciiLetters = [
    ...new Set(response.map((fixture) => fixture.groupAsciiLetter)),
  ];
  const separatedFixtures = uniqueGroupAsciiLetters.map(() => []);
  response.forEach((fixture) => {
    const index = uniqueGroupAsciiLetters.indexOf(fixture.groupAsciiLetter);
    separatedFixtures[index].push(fixture);
  });

  const result = separatedFixtures.map((subarray) =>
    separateByDateOrder(subarray)
  );

  const responseF = {
    nrofechas: Math.max(...result.map((subarray) => subarray.length)),
  };

  res.status(200).json(responseF);
};

function separateByDateOrder(fixtures) {
  const separatedByDateOrder = {};

  fixtures.forEach((fixture) => {
    const dateOrder = fixture.dateOrder;

    if (!separatedByDateOrder[dateOrder]) {
      separatedByDateOrder[dateOrder] = [];
    }
    separatedByDateOrder[dateOrder].push(fixture);
  });

  return Object.values(separatedByDateOrder);
}

export const getPhases = async (req, res) => {
  const { championship, category } = req.query;
  try {
    const response = await Phase.findAll({
      attributes: [
        "idphase",
        "idtypeCompetition",
        "competitionName",
        "ismerito",
        "nroFase",
        "idchampionship",
        "idcategory",
        "idsport",
      ],
      where: {
        idchampionship: championship,
        idcategory: category,
      },
    });
    console.log(response.length);

    if (!response || response.length === 0) {
      res.status(200).json([]); // Envía un array vacío si no hay datos
      return;
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getPhaseMerito = async (req, res) => {
  try {
    const { idphase } = req.params;

    const response = await Phase.findOne({
      attributes: ["idphase", "ismerito"],
      where: {
        idphase: idphase,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createPhase = async (req, res) => {
  const {
    idtypeCompetition,
    competitionName,
    ismerito,
    nroFase,
    idchampionship,
    idcategory,
    idsport,
  } = req.body;
  try {
    const response = await Phase.create({
      idtypeCompetition: idtypeCompetition,
      competitionName: competitionName,
      ismerito: ismerito,
      nroFase: nroFase,
      idchampionship: idchampionship,
      idcategory: idcategory,
      idsport: idsport,
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updatePhase = async (req, res) => {
  const { idphase, idtypeCompetition, ismerito, competitionName } = req.body;

  try {
    let updateFields = {};
    if (idtypeCompetition !== undefined) {
      updateFields.idtypeCompetition = idtypeCompetition;
      updateFields.competitionName = competitionName;
    }
    if (ismerito !== undefined) {
      updateFields.ismerito = ismerito;
    }

    await Phase.update(updateFields, {
      where: {
        idphase: idphase,
      },
      fields: Object.keys(updateFields), // Update only the fields that are present
    });
    res.status(200).json({ msg: "Fase Actualizada!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
