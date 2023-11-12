const Recipe = require("../../models/Recipe");
const User = require("../../models/User");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// missing the token part
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!user) return res.status(404).json("User is not found");
    else await user.updateOne(req.body);
    res.status(204).json(user);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json("User is not found");
    await user.deleteOne();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.addUserToRecipe = async (req, res, next) => {
  try {
    //user should be got req.user
    const { userID, recipeID } = req.params;
    const user = await User.findById(userID);
    const recipe = await Recipe.findById(recipeID);
    await User.findByIdAndUpdate(userID, {
      $push: { recipes: recipe._id },
    });
    await recipe.findByIdAndUpdate(recipeID, {
      $push: { users: user._id },
    });
  } catch (error) {
    next(error);
  }
};
