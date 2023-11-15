const Categorie = require("../../models/Categorie");
const Recipe = require("../../models/Recipe");

exports.getAllRacipes = async (req, res, next) => {
  try {
    const racipe = await Recipe.find();
    res.status(200).json(racipe);
  } catch (error) {
    next(error);
  }
};

exports.createRacipe = async (req, res, next) => {
  console.log(req.user);
  try {
    req.body.user = req.user._id;
    const recipe = await Recipe.create(req.body);
    const ids = recipe.categories;
    const getCategories = await Categorie.find({
      _id: { $in: ids },
    });
    getCategories.forEach(async (category) => {
      await category.updateOne({ $push: { recipes: recipe } });
    });
    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

exports.updateRacipe = async (req, res, next) => {
  try {
    const { racipeId } = req.params;
    const recipe = await Categorie.findByIdAndUpdate(racipeId, req.body, {
      new: true,
    });
    if (!recipe) return res.status(404).json("recipe is not found");
    else await recipe.updateOne(req.body);
    res.status(204).json(recipe);
  } catch (error) {
    next(error);
  }
};

exports.deleteRacipe = async (req, res, next) => {
  try {
    const { racipeId } = req.params;
    const recipe = await Recipe.findById(racipeId);
    if (!recipe) return res.status(404).json("recipe is not found");
    await Recipe.deleteOne();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// exports.addRacipeToCategorie = async (req, res, next) => {
//   try {
//     const { racipeId, CategorieId } = req.params;
//     const racipe = await Recipe.findById(racipeId);
//     const categorie = await Categorie.findById(CategorieId);
//     if (!racipe || !categorie)
//       return res.status(404).json("racipe or categorie not found");
//     await racipe.updateOne({ $push: { categories: categorie } });
//     await categorie.updateOne({ $push: { recipes: racipe } });

//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// };
