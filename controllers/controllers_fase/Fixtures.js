import Fixtures from "../../models/models_fase/FixtureModel.js";
import GroupsTable from "../../models/models_fase/GroupsModel.js";
import Sequelize from "sequelize";
import Phase from "../../models/PhaseModel.js";
import Category from "../../models/CategoryModel.js";
import { Op } from "sequelize";
export const updateStatus = async (req, res) => {
  let idphase = req.body.idphase;
  try {
    await Fixtures.update(
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
      .json({ msg: "Status del fixture ha sido actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getFixturesByAPI = async (req, res) => {
  const { idevent, idsport, nrofecha } = req.query;

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

  try {
    const response = await Fixtures.findAll({
      attributes: [
        "idgroup1",
        "idgroup2",
        "orderGroup1",
        "orderGroup2",
        "groupAsciiLetter",
        "dateOrder",
        "idphase",
      ],
      where: {
        idphase: idPhase,
        dateOrder: nrofecha !== undefined ? nrofecha : { [Op.ne]: null },
        statusDB: true,
      },
    });

    // response agregar un atributo objeto
    const responseMapeadoPromises = response.map(async (fixture) => {
      const fixtureModificado = { ...fixture.toJSON() };

      const responseGroup1 = await GroupsTable.findOne({
        attributes: [
          "business",
          "abrev",
          "orderGroup",
          "denomination",
          "image_path",
        ],
        where: {
          idgroup: fixtureModificado.idgroup1,
        },
      });
      const responseGroup2 = await GroupsTable.findOne({
        attributes: [
          "business",
          "abrev",
          "orderGroup",
          "denomination",
          "image_path",
        ],
        where: {
          idgroup: fixtureModificado.idgroup2,
        },
      });

      // fixtureModificado.institucion1 = responseGroup1;
      // fixtureModificado.institucion2 = responseGroup2;

      fixtureModificado.equipos = [responseGroup1, responseGroup2];

      return fixtureModificado;
    });

    // terminar de ejecutarse las promesas
    const responseMapeado = await Promise.all(responseMapeadoPromises);

    for (let i = 0; i < responseMapeado.length; i++) {
      responseMapeado[i].groupAsciiLetter = String.fromCharCode(
        responseMapeado[i].groupAsciiLetter
      );
    }

    // transformarlo
    // const uniqueGroupAsciiLetters = [
    //   ...new Set(responseMapeado.map((fixture) => fixture.groupAsciiLetter)),
    // ];
    // const separatedFixtures = uniqueGroupAsciiLetters.map(() => []);
    // responseMapeado.forEach((fixture) => {
    //   const index = uniqueGroupAsciiLetters.indexOf(fixture.groupAsciiLetter);
    //   separatedFixtures[index].push(fixture);
    // });

    // const result = separatedFixtures.map((subarray) =>
    //   separateByDateOrder(subarray)
    // );

    res.status(200).json(responseMapeado);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getFixturesByPhase = async (req, res) => {
  try {
    const response = await Fixtures.findAll({
      attributes: [
        "idfixture",
        "idgroup1",
        "idgroup2",
        "idparticipant1",
        "idparticipant2",
        "orderGroup1",
        "orderGroup2",
        "groupAsciiLetter",
        // "groupAsciiLetter1",
        // "groupAsciiLetter2",
        "dateOrder",
        "idphase",
      ],
      where: {
        idphase: req.params.idphase,
        statusDB: true,
      },
    });

    // response agregar un atributo objeto
    const responseMapeadoPromises = response.map(async (fixture) => {
      const fixtureModificado = { ...fixture.toJSON() };

      const responseGroup1 = await GroupsTable.findOne({
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
          idgroup: fixtureModificado.idgroup1,
        },
      });
      const responseGroup2 = await GroupsTable.findOne({
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
          idgroup: fixtureModificado.idgroup2,
        },
      });

      fixtureModificado.institucionGroup1 = responseGroup1;
      fixtureModificado.institucionGroup2 = responseGroup2;

      return fixtureModificado;
    });

    // terminar de ejecutarse las promesas
    const responseMapeado = await Promise.all(responseMapeadoPromises);

    // transformarlo
    const uniqueGroupAsciiLetters = [
      ...new Set(responseMapeado.map((fixture) => fixture.groupAsciiLetter)),
    ];
    const separatedFixtures = uniqueGroupAsciiLetters.map(() => []);
    responseMapeado.forEach((fixture) => {
      const index = uniqueGroupAsciiLetters.indexOf(fixture.groupAsciiLetter);
      separatedFixtures[index].push(fixture);
    });

    const result = separatedFixtures.map((subarray) =>
      separateByDateOrder(subarray)
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
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

export const createFixtures = async (req, res) => {
  const detailData = req.body;
  const phaseId = req.params.idphase;

  const arrayFixture = [];
  for (let i = 0; i < detailData.length; i++) {
    // grupo a, grupo b
    for (let j = 0; j < detailData[i].length; j++) {
      // nro de fecha
      for (let k = 0; k < detailData[i][j].length; k++) {
        // nro de enfrentamiento
        let idgroup1Aux =
          detailData[i][j][k].equipo1.idgroup !== null
            ? detailData[i][j][k].equipo1.idgroup
            : "X";
        let idgroup2Aux =
          detailData[i][j][k].equipo2.idgroup !== null
            ? detailData[i][j][k].equipo2.idgroup
            : "X";
        let idparticipant1Aux =
          detailData[i][j][k].equipo1.idparticipant !== null
            ? detailData[i][j][k].equipo1.idparticipant
            : 0;
        let idparticipant2Aux =
          detailData[i][j][k].equipo2.idparticipant !== null
            ? detailData[i][j][k].equipo2.idparticipant
            : 0;
        let orderGroup1Aux =
          detailData[i][j][k].equipo1.orderGroup !== null
            ? detailData[i][j][k].equipo1.orderGroup
            : "X";
        let orderGroup2Aux =
          detailData[i][j][k].equipo2.orderGroup !== null
            ? detailData[i][j][k].equipo2.orderGroup
            : "X";
        arrayFixture.push({
          idgroup1: idgroup1Aux,
          idgroup2: idgroup2Aux,
          idparticipant1: idparticipant1Aux,
          idparticipant2: idparticipant2Aux,
          orderGroup1: orderGroup1Aux,
          orderGroup2: orderGroup2Aux,
          groupAsciiLetter: 65 + i, // ascii letter
          dateOrder: j + 1, // fecha 1, 2, 3
          idphase: phaseId,
        });
      }
    }
  }
  try {
    const nuevosDetails = await Fixtures.bulkCreate(arrayFixture);
    res.status(201).json(nuevosDetails);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updatedFixtureChange = async (req, res) => {
  const fixture = await Fixtures.findOne({
    where: {
      idfixture: req.params.id,
    },
  });
  if (!fixture) return res.status(404).json({ msg: "Fixture no encontrado" });

  const {
    idparticipant1,
    idparticipant2,
    idgroup1,
    idgroup2,
    orderGroup1,
    orderGroup2,
  } = req.body;
  try {
    const response = await Fixtures.update(
      {
        idparticipant1: idparticipant2,
        idparticipant2: idparticipant1,
        idgroup1: idgroup2,
        idgroup2: idgroup1,
        orderGroup1: orderGroup2,
        orderGroup2: orderGroup1,
      },
      {
        where: {
          idfixture: fixture.idfixture,
        },
      }
    );

    const updatedFixture = await Fixtures.findOne({
      where: {
        idfixture: fixture.idfixture,
      },
    });

    res.status(200).json(updatedFixture);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export const updatedFixtureMove = async (req, res) => {
  const { idfixtureone, idfixturetwo } = req.query;
  const fixture1 = await Fixtures.findOne({
    where: {
      idfixture: idfixtureone,
    },
  });

  const fixture2 = await Fixtures.findOne({
    where: {
      idfixture: idfixturetwo,
    },
  });

  try {
    await Fixtures.update(
      {
        idparticipant1: fixture2.idparticipant1,
        idparticipant2: fixture2.idparticipant2,
        idgroup1: fixture2.idgroup1,
        idgroup2: fixture2.idgroup2,
        orderGroup1: fixture2.orderGroup1,
        orderGroup2: fixture2.orderGroup2,
      },
      {
        where: {
          idfixture: fixture1.idfixture,
        },
      }
    );
  } catch (error) {
    console.error("Error al actualizar el fixture 1");
  }

  try {
    await Fixtures.update(
      {
        idparticipant1: fixture1.idparticipant1,
        idparticipant2: fixture1.idparticipant2,
        idgroup1: fixture1.idgroup1,
        idgroup2: fixture1.idgroup2,
        orderGroup1: fixture1.orderGroup1,
        orderGroup2: fixture1.orderGroup2,
      },
      {
        where: {
          idfixture: fixture2.idfixture,
        },
      }
    );
  } catch (error) {
    console.error("Error al actualizar el fixture 2");
  }

  res.status(200).json({ msg: "Actualizado con exito" });
};

export const updatedFixtureSwap = async (req, res) => {
  const { dataFixtureFecha1, dataFixtureFecha2 } = req.body;

  const extractRelevantData = (data) => {
    return data.map(
      ({
        idfixture,
        idgroup1,
        idgroup2,
        idparticipant1,
        idparticipant2,
        orderGroup1,
        orderGroup2,
        dateOrder,
      }) => ({
        idfixture,
        idgroup1,
        idgroup2,
        idparticipant1,
        idparticipant2,
        orderGroup1,
        orderGroup2,
        dateOrder,
      })
    );
  };

  const filteredData1 = extractRelevantData(dataFixtureFecha1);
  const filteredData2 = extractRelevantData(dataFixtureFecha2);

  // Aquí intercambiamos los datos
  for (let i = 0; i < filteredData1.length; i++) {
    const fixture1 = filteredData1[i];
    const fixture2 = filteredData2[i];

    try {
      // Actualizar el fixture1 con los datos del fixture2
      await Fixtures.update(
        {
          idparticipant1: fixture2.idparticipant1,
          idparticipant2: fixture2.idparticipant2,
          idgroup1: fixture2.idgroup1,
          idgroup2: fixture2.idgroup2,
          orderGroup1: fixture2.orderGroup1,
          orderGroup2: fixture2.orderGroup2,
        },
        {
          where: {
            idfixture: fixture1.idfixture,
          },
        }
      );

      // Actualizar el fixture2 con los datos del fixture1
      await Fixtures.update(
        {
          idparticipant1: fixture1.idparticipant1,
          idparticipant2: fixture1.idparticipant2,
          idgroup1: fixture1.idgroup1,
          idgroup2: fixture1.idgroup2,
          orderGroup1: fixture1.orderGroup1,
          orderGroup2: fixture1.orderGroup2,
        },
        {
          where: {
            idfixture: fixture2.idfixture,
          },
        }
      );
    } catch (error) {
      console.error(
        `Error al actualizar los fixtures ${fixture1.idfixture} y ${fixture2.idfixture}:`,
        error
      );
      return res.status(500).json({ msg: "Error al actualizar los fixtures" });
    }
  }

  res.status(200).json({ msg: "Actualizado con éxito" });
};

///////////////////////////////////////////////////////////////////////////////////>>>>>>>>>>>>>>>>>>><

function convertirDatos(datos) {
  let grupos = {};

  // Organizar los datos por grupo
  datos.forEach((fixture) => {
    if (!grupos[fixture.groupLetter]) {
      grupos[fixture.groupLetter] = [];
    }
    let fechaIndex = fixture.fechaOrder - 1;
    if (!grupos[fixture.groupLetter][fechaIndex]) {
      grupos[fixture.groupLetter][fechaIndex] = {
        fecha: fixture.fechaOrder,
        enfrentamientos: [],
      };
    }
    grupos[fixture.groupLetter][fechaIndex].enfrentamientos.push({
      equipo1: fixture.idparticipantEquipoUno,
      equipo2: fixture.idparticipantEquipoDos,
      idfixture: fixture.idfixture,
    });
  });

  // Convertir los datos organizados en un array
  let resultado = [];
  for (let grupo in grupos) {
    resultado.push(grupos[grupo]);
  }

  return resultado;
}
