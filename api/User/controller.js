const jwt = require("jsonwebtoken");
const Recipe = require("../../models/Recipe");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

const hashedPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const generattoken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.jwt_PRIVATE_KEY, {
    expiresIn: process.env.TAKEN_EXP,
  });
  return token;
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    req.body.password = await hashedPassword(req.body.password, 10);
    const user = await User.create(req.body);
    const token = generattoken({ user });
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const token = generattoken(req.user);
    res.json({ token });
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

exports.addUserToCategorie = async (req, res, next) => {
  try {
    //user should be got req.user
    const { userID, CategorieID } = req.params;
    const user = await User.findById(userID);
    const categorie = await Category.findById(CategorieID);
    await User.findByIdAndUpdate(userID, {
      $push: { categorie: Category._id },
    });
    await categorie.findByIdAndUpdate(CategorieID, {
      $push: { users: user._id },
    });
  } catch (error) {
    next(error);
  }
};
