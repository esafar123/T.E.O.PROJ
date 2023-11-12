const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: String,
  Password: String,
  //  Image: String,
  Categories: [{ type: Schema.Types.ObjectId, ref: "Categories" }],
  Racipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

module.exports = model("User", UserSchema);
