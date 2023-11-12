const { Schema, model } = require("mongoose");

const CategoriosSchema = new Schema({
  name: String,
  //   Image: String,
  Racipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

module.exports = model("Category", CategoriosSchema);
