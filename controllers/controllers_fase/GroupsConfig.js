import GroupsConfig from "../../models/models_fase/GroupsConfigModel.js";

export const getGroupConfigByPhase = async (req, res) => {
  try {
    const response = await GroupsConfig.findOne({
      attributes: [
        "idgroupconfig",
        "numberGroups",
        "numberRounds",
        "setManually",
        "setRandom",
        "numberFilas",
        "idphase",
      ],
      where: {
        idphase: req.params.idphase,
      },
    });

    if (!response) {
      // entra aqui si no existe todavia una configuracion de grupos
      const defaultGroupConfig = {
        numberGroups: 1,
        numberRounds: 1,
        setManually: false,
        setRandom: false,
        numberFilas: 0,
        firstTime: true,
      };
      res.status(200).json(defaultGroupConfig);
    } else {
      response.firstTime = false;
      // Si se encuentra la configuración de grupo, devuelve la respuesta de la base de datos
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createGroupConfig = async (req, res) => {
  const {
    numberGroups,
    numberRounds,
    setManually,
    setRandom,
    numberFilas,
    idphase,
  } = req.body;
  try {
    const newGroupConfig = await GroupsConfig.create({
      numberGroups: numberGroups,
      numberRounds: numberRounds,
      setManually: setManually,
      setRandom: setRandom,
      numberFilas: numberFilas,
      idphase: idphase,
    });

    res.status(201).json({ msg: "Registro Exitoso", data: newGroupConfig });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateGroupConfig = async (req, res) => {
  const {
    idgroupconfig,
    numberGroups,
    numberRounds,
    setManually,
    setRandom,
    numberFilas,
    // saveFlag,
  } = req.body;

  try {
    const response = await GroupsConfig.update(
      {
        numberGroups: numberGroups,
        numberRounds: numberRounds,
        setManually: setManually,
        setRandom: setRandom,
        numberFilas: numberFilas,
      },
      {
        where: {
          idgroupconfig: idgroupconfig,
        },
      }
    );

    const updatedGroupConfig = await GroupsConfig.findOne({
      where: {
        idgroupconfig: idgroupconfig,
      },
    });

    res.status(200).json({
      msg: "Configuracion de grupo actualizado!",
      data: updatedGroupConfig,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
