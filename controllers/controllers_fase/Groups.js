import GroupsTable from "../../models/models_fase/GroupsModel.js";

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

    // restructurar los datos segun el grupo y el orden
    const datosReestructurados = reestructurarDatos(response);

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
