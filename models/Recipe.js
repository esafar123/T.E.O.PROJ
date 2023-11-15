const { Schema, model } = require("mongoose");

const RecipeSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  image: String,
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  ingredient: String,
});

module.exports = model("Recipe", RecipeSchema);
