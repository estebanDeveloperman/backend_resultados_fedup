import Category from "../../models/CategoryModel.js";
import GroupsTable from "../../models/models_fase/GroupsModel.js";
import Phase from "../../models/PhaseModel.js";

export const getGroupsByAPI = async (req, res) => {
  const { idevent, idsport } = req.query;

  try {
    const responseCategory = await Category.findOne({
      attributes: ["id", "idchampionship", "idsport"],
      where: {
        idchampionship: idevent,
        idsport: idsport,
      },
    });

    if (!responseCategory) {
      res.status(404).json({ msg: "Category not found" });
      return;
    }

    const responsePhase = await Phase.findAll({
      attributes: ["idphase", "idchampionship", "idcategory"],
      where: {
        idchampionship: idevent,
        idcategory: responseCategory.id,
      },
    });

    if (responsePhase.length === 0) {
      res.status(404).json({ msg: "Phase not found" });
      return;
    }

    const responseData = responsePhase[0]; // la fase correspondiente
    const idPhase = responseData.idphase;

    const response = await GroupsTable.findAll({
      attributes: [
        "business",
        "abrev",
        "groupAsciiLetter",
        "orderGroup",
        "denomination",
        "image_path",
        "pais",
        "bandera",
      ],
      where: {
        idphase: idPhase,
        statusDB: true,
      },
    });

    if (response.length === 0) {
      res.status(204).send();
      return;
    }

    // Añadir la URL base a los atributos image_path y bandera
    const urlBase = "https://winscore.perufedup.com";
    const updatedResponse = response.map((item) => {
      return {
        ...item.dataValues,
        image_path: urlBase + item.dataValues.image_path,
        bandera: urlBase + item.dataValues.bandera,
      };
    });

    const convertirAsciiALetra = (codigoAscii) => {
      return String.fromCharCode(codigoAscii);
    };

    const datosReestructurados2 = reestructurarDatos2(updatedResponse);

    for (let i = 0; i < datosReestructurados2.length; i++) {
      for (let j = 0; j < datosReestructurados2[i].data.length; j++) {
        datosReestructurados2[i].data[j].groupAsciiLetter =
          convertirAsciiALetra(
            datosReestructurados2[i].data[j].groupAsciiLetter
          );
      }
    }

    res.status(200).json(datosReestructurados2);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const getGroupsByPhase = async (req, res) => {
//   try {
//     const response = await GroupsTable.findAll({
//       attributes: [
//         "idgroup",
//         "idphase",
//         "idparticipant",
//         "business",
//         "abrev",
//         "groupAsciiLetter",
//         "orderGroup",
//         "denomination",
//         "image_path",
//         "pais",
//         "bandera"
//       ],
//       where: {
//         idphase: req.params.idphase,
//         statusDB: true,
//       },
//     });
//     // console.log(response)
//     if (response.length === 0) {
//       res.status(204).send();
//       return;
//     }

//     // restructurar los datos segun el grupo y el orden
//     const datosReestructurados = reestructurarDatos(response);

//     res.status(200).json(datosReestructurados);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

export const getGroupsByPhase = async (req, res) => {
  try {
    const response = await GroupsTable.findAll({
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
        "pais",
        "bandera",
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

    // Añadir la URL base a los atributos image_path y bandera
    const urlBase = "https://winscore.perufedup.com";
    const updatedResponse = response.map((item) => {
      return {
        ...item.dataValues,
        image_path: urlBase + item.dataValues.image_path,
        bandera: urlBase + item.dataValues.bandera,
      };
    });

    // Reestructurar los datos según el grupo y el orden
    const datosReestructurados = reestructurarDatos(updatedResponse);

    res.status(200).json(datosReestructurados);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ---->
const reestructurarDatos = (data) => {
  // Agrupar los datos por groupAsciiLetter
  const grupos = data.reduce((acc, curr) => {
    const index = curr.groupAsciiLetter - 65; // Convertir ASCII a índice (0, 1, 2, ...)
    acc[index] = acc[index] || []; // Crear un array si no existe en ese índice
    acc[index].push(curr); // Agregar el objeto al array correspondiente
    return acc;
  }, []);

  // Ordenar los grupos por orderGroup
  grupos.forEach((grupo) => {
    grupo.sort((a, b) => a.orderGroup - b.orderGroup);
  });

  return grupos;
};
// ---->
const reestructurarDatos2 = (data) => {
  // Agrupar los datos por groupAsciiLetter y convertir el valor numérico a su equivalente en cadena
  const grupos = data.reduce((acc, curr) => {
    const index = String.fromCharCode(curr.groupAsciiLetter); // Convertir el valor numérico a su equivalente en cadena
    acc[index] = acc[index] || { grupo: index, data: [] }; // Crear un objeto para el grupo si no existe
    acc[index].data.push(curr); // Agregar el objeto al array de datos del grupo correspondiente
    return acc;
  }, {});

  // Convertir el objeto en un array de grupos y ordenar los grupos por la letra
  const gruposArray = Object.values(grupos).sort((a, b) =>
    a.grupo.localeCompare(b.grupo)
  );

  // Ordenar los datos de cada grupo por orderGroup
  gruposArray.forEach((grupo) => {
    grupo.data.sort((a, b) => a.orderGroup - b.orderGroup);
  });

  return gruposArray;
};

export const createGroups = async (req, res) => {
  const detailData = req.body;

  // aplanar array
  const detailDataAplanado = [].concat(...detailData);

  try {
    const nuevosDetails = await GroupsTable.bulkCreate(detailDataAplanado);
    res.status(201).json(nuevosDetails);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// "idgroup",
// "idphase",
// "groupLetter",
// "orderGroup",
// "idinstitution",
// "busei",
// "image_path",
// "abrev",
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
    res.status(200).json({ msg: "Status de grupos actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateGroupById = async (req, res) => {
  const groupCell = await GroupsTable.findOne({
    where: {
      idgroup: req.params.id,
    },
  });
  if (!groupCell)
    return res.status(404).json({ msg: "Registro de grupo no encontrado" });

  const { idparticipant, business, abrev, denomination, image_path } = req.body;

  try {
    await GroupsTable.update(
      {
        idparticipant: idparticipant,
        business: business,
        abrev: abrev,
        denomination: denomination,
        image_path: image_path,
      },
      {
        where: {
          idgroup: groupCell.idgroup,
        },
      }
    );
    res.status(200).json({ msg: "Grupo Cell Actualizado!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateGroups = async (req, res) => {
  const detailData = req.body;

  try {
    let idphase; // Declarar la variable fuera del bucle

    for (const data of detailData) {
      const {
        phaseId,
        idgroup,
        idparticipant,
        business,
        abrev,
        groupAsciiLetter,
        orderGroup,
        denomination,
        image_path,
      } = data;

      idphase = phaseId; // Asignar el valor de idphase

      await GroupsTable.update(
        {
          business,
          abrev,
          idparticipant,
          groupAsciiLetter,
          orderGroup,
          denomination,
          image_path,
        },
        {
          where: {
            idgroup: idgroup, // Usar el idgroup en la consulta
          },
        }
      );
    }

    const updatedGroups = await GroupsTable.findAll({
      where: {
        idphase: idphase, // Utilizar la variable idphase aquí
      },
    });

    res.status(200).json({
      msg: "Tabla de grupos actualizada!",
      data: updatedGroups,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
