import Matches from "../../models/models_fase/MatchModel.js";
import GroupsTable from "../../models/models_fase/GroupsModel.js";
import Participant from "../../models/models_fase/ParticipantsModel.js";
import Period from "../../models/models_fase/PeriodModel.js";
import Category from "../../models/CategoryModel.js";
import Phase from "../../models/PhaseModel.js";
import { Op } from "sequelize";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obtener __dirname equivalente en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const updateStatus = async (req, res) => {
  let idphase = req.body.idphase;
  try {
    await Matches.update(
      {
        statusDB: false,
      },
      {
        where: {
          idphase: idphase,
        },
      }
    );
    res
      .status(200)
      .json({ msg: "Status de matches actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getMatchById = async (req, res) => {
  try {
    const match = await Matches.findOne({
      where: {
        idmatch: req.params.id,
      },
    });
    if (!match) return res.status(404).json({ msg: "Match no encontrado" });

    const response = await Matches.findOne({
      attributes: [
        "idmatch",
        "idfixture",
        "idgroup1",
        "idgroup2",
        "groupAsciiLetter",
        "dateOrder",
        "nroMatch",
        "ordenMatch",
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
        "idfecha",
        "fecha",
        "idphase",
        "parametro1",
        "parametro2",
      ],
      where: {
        idmatch: match.idmatch,
        statusDB: true,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getPeriodByMatch = async (idmatch) => {
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

// export const getMatchesByAPI = async (req, res) => {
//   const { idevent, idsport, nrofecha } = req.query;
//   try {
//     const responseCategory = await Category.findOne({
//       attributes: ["id", "idchampionship", "idsport"],
//       where: {
//         idchampionship: idevent,
//         idsport: idsport,
//       },
//     });

//     const responsePhase = await Phase.findAll({
//       attributes: ["idphase", "idchampionship", "idcategory"],
//       where: {
//         idchampionship: idevent,
//         idcategory: responseCategory.id,
//       },
//     });
//     const responseData = responsePhase[0]; // la fase correspondiente
//     const idPhase = responseData.idphase;

//     const response = await Matches.findAll({
//       attributes: [
//         "idgroup1",
//         "idgroup2",
//         "groupAsciiLetter",
//         "dateOrder",
//         "nroMatch",
//         "dateMatch",
//         "timeMatch",
//         "uniform1",
//         "uniform2",
//         "campus",
//         "resultado1",
//         "resultado2",
//       ],
//       where: {
//         idphase: idPhase,
//         dateOrder: nrofecha !== undefined ? nrofecha : { [Op.ne]: null },
//         statusDB: true,
//       },
//     });
//     if (response.length === 0) {
//       res.status(204).send();
//       return;
//     }
//     for (let i = 0; i < response.length; i++) {
//       response[i].groupAsciiLetter = String.fromCharCode(
//         response[i].groupAsciiLetter
//       );
//     }
//     const responseMapeadoPromises = response.map(async (match) => {
//       const matchModificado = { ...match.toJSON() };

//       const responseGroup1P = await GroupsTable.findOne({
//         attributes: [
//           "business",
//           "abrev",
//           "orderGroup",
//           "denomination",
//           "image_path",
//         ],
//         where: {
//           idgroup: matchModificado.idgroup1,
//         },
//       });
//       const responseGroup2P = await GroupsTable.findOne({
//         attributes: [
//           "business",
//           "abrev",
//           "orderGroup",
//           "denomination",
//           "image_path",
//         ],
//         where: {
//           idgroup: matchModificado.idgroup2,
//         },
//       });
//       const [responseGroup1, responseGroup2] = await Promise.all([
//         responseGroup1P,
//         responseGroup2P,
//       ]);

//       // matchModificado.institucion1 = responseGroup1;
//       // matchModificado.institucion2 = responseGroup2;
//       matchModificado.equipos = [responseGroup1, responseGroup2];

//       return matchModificado;
//     });
//     // terminar de ejecutar las promesas
//     const responseMapeado = await Promise.all(responseMapeadoPromises);

//     // console.log(responseMapeado);
//     res.status(200).json(responseMapeado);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// export const getMatchesByAPI = async (req, res) => {
//   const { idevent, idsport, nrofecha } = req.query;
//   try {
//     const responseCategory = await Category.findOne({
//       attributes: ["id", "idchampionship", "idsport"],
//       where: {
//         idchampionship: idevent,
//         idsport: idsport,
//       },
//     });

//     const responsePhase = await Phase.findAll({
//       attributes: ["idphase", "idchampionship", "idcategory"],
//       where: {
//         idchampionship: idevent,
//         idcategory: responseCategory.id,
//       },
//     });

//     let idPhases = [responsePhase[0].idphase]; // fase correspondiente
//     let additionalPhaseCondition = false;

//     if (
//       idevent === 192 &&
//       idsport === 5 &&
//       (nrofecha === 4 || nrofecha === 5)
//     ) {
//       idPhases = [responsePhase[0].idphase, responsePhase[1].idphase];
//       additionalPhaseCondition = true;
//     }

//     const whereConditions = {
//       idphase: idPhases,
//       statusDB: true,
//     };

//     if (nrofecha !== undefined) {
//       whereConditions.dateOrder = nrofecha;
//     }

//     const response = await Matches.findAll({
//       attributes: [
//         "idgroup1",
//         "idgroup2",
//         "groupAsciiLetter",
//         "dateOrder",
//         "nroMatch",
//         "dateMatch",
//         "timeMatch",
//         "uniform1",
//         "uniform2",
//         "campus",
//         "resultado1",
//         "resultado2",
//       ],
//       where: whereConditions,
//     });

//     if (response.length === 0) {
//       res.status(204).send();
//       return;
//     }

//     const modifiedResponse = response.map((match) => {
//       const matchModificado = { ...match.toJSON() };

//       // Modificar dateOrder para partidos de responsePhase[1]
//       if (
//         additionalPhaseCondition &&
//         match.idphase === responsePhase[1].idphase
//       ) {
//         matchModificado.dateOrder += 3;
//       }

//       matchModificado.groupAsciiLetter = String.fromCharCode(
//         matchModificado.groupAsciiLetter
//       );

//       return matchModificado;
//     });

//     const responseMapeadoPromises = modifiedResponse.map(async (match) => {
//       const matchModificado = { ...match };

//       const responseGroup1P = await GroupsTable.findOne({
//         attributes: [
//           "business",
//           "abrev",
//           "orderGroup",
//           "denomination",
//           "image_path",
//           "pais",
//           "bandera",
//         ],
//         where: {
//           idgroup: matchModificado.idgroup1,
//         },
//       });

//       const responseGroup2P = await GroupsTable.findOne({
//         attributes: [
//           "business",
//           "abrev",
//           "orderGroup",
//           "denomination",
//           "image_path",
//           "pais",
//           "bandera",
//         ],
//         where: {
//           idgroup: matchModificado.idgroup2,
//         },
//       });

//       const [responseGroup1, responseGroup2] = await Promise.all([
//         responseGroup1P,
//         responseGroup2P,
//       ]);

//       matchModificado.equipos = [responseGroup1, responseGroup2];

//       return matchModificado;
//     });

//     // Terminar de ejecutar las promesas
//     const responseMapeado = await Promise.all(responseMapeadoPromises);

//     res.status(200).json(responseMapeado);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

export const getMatchesByAPI = async (req, res) => {
  const { idevent, idsport, nrofecha } = req.query;

  // Leer y parsear fisu.json
  const fisuFilePath = path.resolve(__dirname, "fisu.json");
  const fisuData = JSON.parse(fs.readFileSync(fisuFilePath, "utf8"));

  // Si nrofecha es igual a 4, devolver el contenido del archivo fisu.json
  if (idevent === "192" && idsport === "5" && nrofecha === "4") {
    res.status(200).json(fisuData);
    return;
  }
  if (idevent === "192" && idsport === "5" && nrofecha === "5") {
    res.status(200).json(fisuData);
    return;
  }

  try {
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

    const response = await Matches.findAll({
      attributes: [
        "idgroup1",
        "idgroup2",
        "groupAsciiLetter",
        "dateOrder",
        "nroMatch",
        "dateMatch",
        "timeMatch",
        "uniform1",
        "uniform2",
        "campus",
        "resultado1",
        "resultado2",
      ],
      where: {
        idphase: idPhase,
        dateOrder: nrofecha !== undefined ? nrofecha : { [Op.ne]: null },
        statusDB: true,
      },
    });
    if (response.length === 0) {
      res.status(204).send();
      return;
    }
    for (let i = 0; i < response.length; i++) {
      response[i].groupAsciiLetter = String.fromCharCode(
        response[i].groupAsciiLetter
      );
    }
    const responseMapeadoPromises = response.map(async (match) => {
      const matchModificado = { ...match.toJSON() };

      const responseGroup1P = await GroupsTable.findOne({
        attributes: [
          "business",
          "abrev",
          "orderGroup",
          "denomination",
          "image_path",
          "pais",
          "bandera",
        ],
        where: {
          idgroup: matchModificado.idgroup1,
        },
      });
      const responseGroup2P = await GroupsTable.findOne({
        attributes: [
          "business",
          "abrev",
          "orderGroup",
          "denomination",
          "image_path",
          "pais",
          "bandera",
        ],
        where: {
          idgroup: matchModificado.idgroup2,
        },
      });
      const [responseGroup1, responseGroup2] = await Promise.all([
        responseGroup1P,
        responseGroup2P,
      ]);

      matchModificado.equipos = [responseGroup1, responseGroup2];

      return matchModificado;
    });

    // Terminar de ejecutar las promesas
    const responseMapeado = await Promise.all(responseMapeadoPromises);

    res.status(200).json(responseMapeado);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMatchesByPhase = async (req, res) => {
  try {
    const response = await Matches.findAll({
      attributes: [
        "idmatch",
        "idfixture",
        "idgroup1",
        "idgroup2",
        "groupAsciiLetter",
        "dateOrder",
        "nroMatch",
        "ordenMatch",
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
        "idfecha",
        "fecha",
        "idphase",
        "parametro1",
        "parametro2",
      ],
      where: {
        idphase: req.params.idphase,
        statusDB: true,
      },
    });
    // console.log(response)
    if (response.length === 0) {
      res.status(204).send();
      return;
    }

    // response agregar un atributo objeto
    const responseMapeadoPromises = response.map(async (match) => {
      const matchModificado = { ...match.toJSON() };

      const responseGroup1P = await GroupsTable.findOne({
        attributes: [
          "idgroup",
          "idphase",
          "idparticipant",
          "business",
          "abrev",
          "groupAsciiLetter",
          "orderGroup",
          "denomination",
          "image_path",
        ],
        where: {
          idgroup: matchModificado.idgroup1,
        },
      });
      const responseGroup2P = await GroupsTable.findOne({
        attributes: [
          "idgroup",
          "idphase",
          "idparticipant",
          "business",
          "abrev",
          "groupAsciiLetter",
          "orderGroup",
          "denomination",
          "image_path",
        ],
        where: {
          idgroup: matchModificado.idgroup2,
        },
      });
      const [responseGroup1, responseGroup2] = await Promise.all([
        responseGroup1P,
        responseGroup2P,
      ]);
      const [responseInstitution1, responseInstitution2, responsePerd] =
        await Promise.all([
          Participant.findOne({
            attributes: ["idparticipant", "idinstitution"],
            where: {
              idparticipant: responseGroup1 ? responseGroup1.idparticipant : "",
            },
          }),
          Participant.findOne({
            attributes: ["idparticipant", "idinstitution"],
            where: {
              idparticipant: responseGroup2 ? responseGroup2.idparticipant : "",
            },
          }),
          getPeriodByMatch(matchModificado.idmatch),
        ]);
      // const responseInstitution1 = await Participant.findOne({
      //   attributes: ["idparticipant", "idinstitution"],
      //   where: {
      //     idparticipant:
      //       responseGroup1 && responseGroup1.toJSON()
      //         ? responseGroup1.toJSON().idparticipant
      //         : "",
      //   },
      // });
      // const responseInstitution2 = await Participant.findOne({
      //   attributes: ["idparticipant", "idinstitution"],
      //   where: {
      //     idparticipant:
      //       responseGroup2 && responseGroup2.toJSON()
      //         ? responseGroup2.toJSON().idparticipant
      //         : "",
      //   },
      // });
      matchModificado.insitutionId1 = responseInstitution1;
      matchModificado.insitutionId2 = responseInstitution2;
      matchModificado.institucionGroup1 = responseGroup1;
      matchModificado.institucionGroup2 = responseGroup2;
      matchModificado.periods = responsePerd;
      // matchModificado.periods = responsePerd

      return matchModificado;
    });

    // terminar de ejecutar las promesas
    const responseMapeado = await Promise.all(responseMapeadoPromises);

    res.status(200).json(responseMapeado);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMatchesByNroDate = async (req, res) => {
  const { idphase, groupAsciiLetter, dateOrder } = req.query;
  try {
    const response = await Matches.findAll({
      attributes: [
        "idmatch",
        "idfixture",
        "idgroup1",
        "idgroup2",
        "groupAsciiLetter",
        "dateOrder",
        "nroMatch",
        "ordenMatch",
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
        "idfecha",
        "fecha",
        "idphase",
        "parametro1",
        "parametro2",
      ],
      where: {
        idphase: idphase,
        groupAsciiLetter: groupAsciiLetter,
        dateOrder: dateOrder,
        statusDB: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createMatches = async (req, res) => {
  const detailData = req.body;
  try {
    const nuevosDetails = await Matches.bulkCreate(detailData);
    res.status(201).json(nuevosDetails);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateMatch = async (req, res) => {
  const match = await Matches.findOne({
    where: {
      idmatch: req.params.id,
    },
  });
  if (!match) return res.status(404).json({ msg: "Match no encontrado" });

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
    idfecha,
    fecha,
    flagConfirmado,
    parametro1,
    parametro2,
  } = req.body;
  try {
    const response = await Matches.update(
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
        idfecha: idfecha,
        fecha: fecha,
        flagConfirmado: flagConfirmado,
        parametro1,
        parametro2,
      },
      {
        where: {
          idmatch: match.idmatch,
        },
      }
    );

    const updatedMatched = await Matches.findOne({
      where: {
        idmatch: match.idmatch,
      },
    });
    res.status(200).json(updatedMatched);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
