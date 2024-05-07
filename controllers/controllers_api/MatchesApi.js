import Matches from "../../models/models_fase/MatchModel.js";
import GroupsTable from "../../models/models_fase/GroupsModel.js";
import Participant from "../../models/models_fase/ParticipantsModel.js";
import Phase from "../../models/PhaseModel.js";
import Category from "../../models/CategoryModel.js";
import Period from "../../models/models_fase/PeriodModel.js";

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

export const getMatchesByPhaseApi = async (req, res) => {
  const { idevent, idsport, idfecha } = req.query;
  try {
    const responseCategory = await Category.findOne({
      attributes: [
        "id",
        "name",
        "acronym",
        "quantity",
        "logo_path",
        "idchampionship",
        "idsport",
      ],
      where: {
        idchampionship: idevent,
        idsport: idsport,
      },
    });

    const responsePhase = await Phase.findAll({
      attributes: [
        "idphase",
        "idtypeCompetition",
        "ismerito",
        "nroFase",
        "idchampionship",
        "idcategory",
      ],
      where: {
        idchampionship: idevent,
        idcategory: responseCategory.id,
      },
    });
    const responseData = responsePhase[0]; // la fase correspondiente
    const idPhase = responseData.idphase;

    const response = await Matches.findAll({
      attributes: [
        "idmatch",
        "idfixture",
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
        "idwinner",
        "flagConfirmado",
        "idphase",
      ],
      where: {
        idphase: idPhase,
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
      const [responseInstitution1, responseInstitution2, responsePerd] = await Promise.all([
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
      matchModificado.insitutionId1 = responseInstitution1;
      matchModificado.insitutionId2 = responseInstitution2;
      matchModificado.institucionGroup1 = responseGroup1;
      matchModificado.institucionGroup2 = responseGroup2;
      matchModificado.periods = responsePerd;

      return matchModificado;
    });

    // terminar de ejecutar las promesas
    const responseMapeado = await Promise.all(responseMapeadoPromises);

    // -->
    const groupedArray = groupByDateOrder(responseMapeado);
    const groupedResult = Object.values(groupedArray);

    // DATO QUE NECESITO DEL GROUPEDRESULT
    const simplifiedData = groupedResult.map((group) => {
      return group.map(
        ({
          institucionGroup1,
          institucionGroup2,
          resultado1,
          resultado2,
          dateOrder,
          groupAsciiLetter,
          periods,
        }) => {
          return {
            institucionGroup1,
            institucionGroup2,
            resultado1,
            resultado2,
            dateOrder,
            groupAsciiLetter,
            periods,
          };
        }
      );
    });
    const filteredSimplifiedData = simplifiedData.map((group) => {
      return group.filter(({ dateOrder }) => dateOrder === parseInt(idfecha));
    });

    const fechas = [
      { idfecha: 1, dateOrder: 1, letterRef: "A" },
      { idfecha: 2, dateOrder: 2, letterRef: "A" },
      { idfecha: 3, dateOrder: 3, letterRef: "A" },
      { idfecha: 4, dateOrder: 4, letterRef: "A" },
      { idfecha: 5, dateOrder: 5, letterRef: "A" },
      { idfecha: 6, dateOrder: 1, letterRef: "B" },
      { idfecha: 7, dateOrder: 2, letterRef: "B" },
      { idfecha: 8, dateOrder: 3, letterRef: "B" },
      { idfecha: 9, dateOrder: 4, letterRef: "B" },
      { idfecha: 10, dateOrder: 5, letterRef: "B" },
    ];

    const flattenedData = filteredSimplifiedData.flatMap((group) => group);

    const dataWithIdFecha = flattenedData.map((obj) => {
      const matchingFecha = fechas.find(
        (fecha) =>
          fecha.dateOrder === obj.dateOrder &&
          fecha.letterRef === String.fromCharCode(obj.groupAsciiLetter)
      );
      if (matchingFecha) {
        return { ...obj, idfecha: matchingFecha.idfecha };
      } else {
        // Si no se encuentra una coincidencia, asigna null a idfecha
        return { ...obj, idfecha: null };
      }
    });

    res.status(200).json(dataWithIdFecha);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

function groupByDateOrder(arr) {
  const grouped = {};
  arr.forEach((obj) => {
    const dateOrder = obj.dateOrder;
    if (!grouped[dateOrder]) {
      grouped[dateOrder] = [];
    }
    grouped[dateOrder].push(obj);
  });
  return grouped;
}
