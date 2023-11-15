const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //  Image: String,
  Bio: String,
  // Birth: { type: Date, required: true, trim: true },
  age: { type: Number, min: 19 },
  Categories: [{ type: Schema.Types.ObjectId, ref: "Category" }], // not here
  Racipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

module.exports = model("User", UserSchema);
