const { Schema, model } = require("mongoose");

const RecipeSchema = new Schema({
  name: String,
  username: String,
  //  Image: String,
  Categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  Ingredient: String,
});

module.exports = model("Recipe", RecipeSchema);
