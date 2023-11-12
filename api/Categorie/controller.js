const Categorie = require("../../models/Categorie");
const Recipe = require("../../models/Recipe");

exports.getAllCategories = async (req, res, next) => {
  try {
    const Categories = await Categorie.find();
    res.status(200).json(Categories);
  } catch (error) {
    next(error);
  }
};

exports.createCategorie = async (req, res, next) => {
  try {
    const categorie = await Categorie.create(req.body);
    res.status(201).json(categorie);
  } catch (error) {
    next(error);
  }
};

exports.updateCategorie = async (req, res, next) => {
  try {
    const { categorieId } = req.params;
    const categorie = await Categorie.findByIdAndUpdate(categorieId, req.body, {
      new: true,
    });
    if (!categorie) return res.status(404).json("categorie is not found");
    else await categorie.updateOne(req.body);
    res.status(204).json(categorie);
  } catch (error) {
    next(error);
  }
};

exports.deleteCategorie = async (req, res, next) => {
  try {
    const { categorieId } = req.params;
    const categorie = await Categorie.findById(categorieId);
    if (!categorie) return res.status(404).json("categorie is not found");
    await categorie.deleteOne();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.addCategorieToRacipe = async (req, res, next) => {
  try {
    const { racipeId, CategorieId } = req.params;
    const racipe = await Recipe.findById(racipeId);
    const categorie = await Categorie.findById(CategorieId);
    if (!racipe || !categorie)
      return res.status(404).json("racipe or categorie not found");
    await racipe.updateOne({ $push: { categories: categorie } });
    await categorie.updateOne({ $push: { recipes: racipe } });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
