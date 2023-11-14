const { Schema, model } = require("mongoose");

const RecipeSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  image: String,
  description: String,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  ingredients: String,
});

module.exports = model("Recipe", RecipeSchema);
