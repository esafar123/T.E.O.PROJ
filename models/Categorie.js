const { Schema, model } = require("mongoose");

const CategoriosSchema = new Schema({
  categoryname: { type: String, required: true },
  //   Image: String,
  Racipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

module.exports = model("Category", CategoriosSchema);
