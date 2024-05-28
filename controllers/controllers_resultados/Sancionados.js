import Sancionado from "../../models/models_resultados/SancionesModel.js";
import { Op } from "sequelize";

import Matches from "../../models/models_fase/MatchModel.js";

export const getSancionadosByMatch = async (req, res) => {
  const { idmatch } = req.query;
  try {
    const response = await Sancionado.findAll({
      attributes: [
        "idsancionado",
        "nrofecha",
        "photo",

        "persona",
        "firstname",
        "lastname",
        "surname",

        "elofide",
        "business",
        "abrev",
        "image_path",
        "idperson",
        "docnumber",
        "idsport",
        "iduni",
        "idchampionship",
        "idphase",

        "idmatch",
        "color",
        "codigo_color",
        "idtarjeta",
        "nombre_tarjeta",
        "abrev_tarjeta",
        "fechassuspendido",

        "parametro1",
        "parametro2",
      ],
      where: {
        idmatch: idmatch,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSancionadosByPerson = async (req, res) => {
  const { idphase, idperson } = req.query;
  try {
    const sancionados = await Sancionado.findAll({
      attributes: [
        "idsancionado",
        "nrofecha",
        "photo",
        "persona",
        "firstname",
        "lastname",
        "surname",
        "elofide",
        "business",
        "abrev",
        "image_path",
        "idperson",
        "docnumber",
        "idsport",
        "iduni",
        "idchampionship",
        "idphase",
        "idmatch",
        "color",
        "codigo_color",
        "idtarjeta",
        "nombre_tarjeta",
        "abrev_tarjeta",
        "fechassuspendido",
        "parametro1",
        "parametro2",
      ],
      where: {
        idphase: idphase,
        idperson: idperson,
      },
    });
    // console.log("Sancionados", sancionados);
    // console.log("IDPERSON", idperson);

    // // Filtra las tarjetas amarillas
    // const tarjetasA = sancionados.filter(
    //   (sancionado) => sancionado.abrev_tarjeta === "A"
    // );

    // // Si hay al menos dos apariciones de "A", aplicar la suspensión
    // if (tarjetasA.length >= 2) {
    //   const result = sancionados.map((sancionado) => {
    //     if (sancionado.abrev_tarjeta === "A") {
    //       return {
    //         ...sancionado.dataValues,
    //         idtarjeta: 5,
    //         nombre_tarjeta: "Suspendido",
    //         abrev_tarjeta: "S",
    //         color: "negro",
    //         codigo_color: "#000000",
    //         nrofecha: parseInt(sancionado.nrofecha) + 1,
    //       };
    //     }
    //     return sancionado;
    //   });
    //   return res.status(200).json(result);
    // }

    // Si no hay suficientes tarjetas "A", devolver los registros originales
    res.status(200).json(sancionados);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSancionadoByPhase = async (req, res) => {
  const { idphase, nrofecha, iduni1, iduni2 } = req.query;
  try {
    const whereConditions = {
      idphase: idphase,
      nrofecha: nrofecha !== undefined ? nrofecha : { [Op.ne]: null },
    };

    if (iduni1 && iduni2) {
      whereConditions[Op.or] = [{ iduni: iduni1 }, { iduni: iduni2 }];
    } else if (iduni1) {
      whereConditions.iduni = iduni1;
    } else if (iduni2) {
      whereConditions.iduni = iduni2;
    }
    console.log("unis", iduni1, iduni2);

    const response = await Sancionado.findAll({
      attributes: [
        "idsancionado",
        "nrofecha",
        "photo",

        "persona",
        "firstname",
        "lastname",
        "surname",

        "elofide",
        "business",
        "abrev",
        "image_path",
        "idperson",
        "docnumber",
        "idsport",
        "iduni",
        "idchampionship",
        "idphase",

        "idmatch",
        "color",
        "codigo_color",
        "idtarjeta",
        "nombre_tarjeta",
        "abrev_tarjeta",
        "fechassuspendido",

        "parametro1",
        "parametro2",
      ],
      where: whereConditions,
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const getSancionadoByPhase = async (req, res) => {
//   const { idphase, nrofecha } = req.query;
//   try {
//     const response = await Sancionado.findAll({
//       attributes: [
//         "idsancionado",
//         "nrofecha",
//         "photo",

//         "persona",
//         "firstname",
//         "lastname",
//         "surname",

//         "elofide",
//         "business",
//         "abrev",
//         "image_path",
//         "idperson",
//         "docnumber",
//         "idsport",
//         "iduni",
//         "idchampionship",
//         "idphase",

//         "idmatch",
//         "color",
//         "codigo_color",
//         "idtarjeta",
//         "nombre_tarjeta",
//         "abrev_tarjeta",
//         "fechassuspendido",

//         "parametro1",
//         "parametro2",
//       ],
//       where: {
//         idphase: idphase,
//         nrofecha: nrofecha !== undefined ? nrofecha : { [Op.ne]: null },
//       },
//     });
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

export const createSancionados = async (req, res) => {
  const detailData = req.body;

  try {
    const nuevosDetails = await Sancionado.bulkCreate(detailData);
    res.status(201).json(nuevosDetails);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const limpiarSanciones = async (req, res) => {
  const { dataEliminar } = req.body; // Suponiendo que es un array de objetos con { idsancionado }
  const idMatch = req.params.id; // Recuperar idMatch de los parámetros de la ruta

  console.log("data", dataEliminar);
  // Extraer los idsancionado del array de objetos
  const idsToDelete = dataEliminar.map((item) => item.idsancionado);

  try {
    // Eliminar las sanciones correspondientes al idMatch y los idsancionado proporcionados
    const result = await Sancionado.destroy({
      where: {
        idsancionado: idsToDelete,
        idmatch: idMatch, // Incluye esta condición si es necesario
      },
    });

    // Actualizar el campo parametro2 en la tabla Matches
    const result2 = await Matches.update(
      { parametro2: "" },
      {
        where: {
          idmatch: idMatch,
        },
      }
    );

    res
      .status(200)
      .json({ message: "Sanciones eliminadas correctamente", result, result2 });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar sanciones", error: error.message });
  }
};
