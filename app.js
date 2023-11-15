const express = require("express");
const connectDB = require("./database");
const userRouter = require("./api/User/routes");
const racipeRouter = require("./api/Racipe/routes");
const categorieRouter = require("./api/Categorie/routes");
const morgan = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const { notFound } = require("./middleware/notFound");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const path = require("path");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

app.use("/api/users", userRouter);

app.use("/api/recipes", racipeRouter);

app.use("/api/categories", categorieRouter);

app.use(notFound);
app.use(errorHandler);
connectDB();
app.listen(8000, () => {
  console.log("app is running in port 8000");
});
