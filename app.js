const express = require("express");
const connectDB = require("./database");
const userRouter = require("./api/User/routes");
const racipeRouter = require("./api/Racipe/routes");
const categorieRouter = require("./api/Categorie/routes");

const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/racipes", racipeRouter);
app.use("/api/categories", categorieRouter);

connectDB();
app.listen(8000, () => {
  console.log("app is running in port 8000");
});
