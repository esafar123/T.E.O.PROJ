const mongoose = require("mongoose");

require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOODB_URL);
    console.log("CONNECTED!!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
