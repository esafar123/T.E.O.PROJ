const express = require("express");
const {
  getAllRacipes,
  createRacipe,
  updateRacipe,
  deleteRacipe,
  addRacipeToCategorie,
} = require("./controller");
const router = express.Router();

// token
router.get("/", getAllRacipes);
router.post("/", createRacipe);
router.put("/:racipesId", updateRacipe);
router.delete("/:racipesId", deleteRacipe);
router.put("/:racipesId/:CategorieId", addRacipeToCategorie);

module.exports = router;
