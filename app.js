const express = require("express");
const connectDB = require("./database");
const userRouter = require("./api/User/routes");
const racipeRouter = require("./api/Racipe/routes");
const categorieRouter = require("./api/Categorie/routes");
const jasonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const multer = require("multer");
const { notFound } = require("./middleware/notFound");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// login, register, getting user from token
app.use("/api/users", userRouter);
// missing token
app.use("/api/racipes", racipeRouter);
// missing token
app.use("/api/categories", categorieRouter);

app.use(notFound);
app.use(errorHandler);
connectDB();
app.listen(8000, () => {
  console.log("app is running in port 8000");
});
