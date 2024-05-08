import Category from "../models/CategoryModel.js";
import Championship from "../models/ChampionshipModel.js";

export const getCategorieById = async (req, res) => {
  const { idcategory } = req.query;
  try {
    const category = await Category.findOne({
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
        id: idcategory,
      },
    });

    if (!category) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    const championship = await Championship.findOne({
      attributes: [
        "idchampionship",
        "name",
        "startdate",
        "enddate",
        "place",
        "period",
        "logo_path",
      ],
      where: {
        idchampionship: category.idchampionship,
      },
    });

    if (!championship) {
      return res.status(404).json({ msg: "Campeonato no encontrado" });
    }

    category.dataValues.championship = championship;

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al buscar la categoría" });
  }
};

export const getCategoriesByChampionship = async (req, res) => {
  const { championship, idsport } = req.query;
  try {
    let whereCondition = { idchampionship: championship };

    if (idsport) {
      whereCondition.idsport = idsport.split(",");
    }

    const response = await Category.findAll({
      attributes: [
        "id",
        "name",
        "acronym",
        "quantity",
        "logo_path",
        "idchampionship",
        "idsport",
      ],
      where: whereCondition,
      include: [
        {
          model: Championship,
          attributes: [
            "idchampionship",
            "name",
            "startdate",
            "enddate",
            "place",
            "period",
            "logo_path",
          ],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { name, acronym, quantity, logo_path, idchampionship, idsport } =
    req.body;
  try {
    const response = await Category.findOne({
      attributes: ["idchampionship", "idsport"],
      where: {
        idchampionship: idchampionship,
        idsport: idsport,
      },
    });
    if (response) {
      return res.status(400).json({ msg: "Ya creaste esta categoria" });
    }

    const newCategory = await Category.create({
      name: name,
      acronym: acronym,
      quantity: quantity,
      logo_path: logo_path,
      idchampionship: idchampionship,
      idsport: idsport,
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
