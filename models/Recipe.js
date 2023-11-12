const { Schema, model } = require("mongoose");

const RecipeSchema = new Schema({
  name: { type: String, required: true },
  username: String,
  //  Image: String,
  categorytype: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  Ingredient: String,
});

module.exports = model("Recipe", RecipeSchema);
