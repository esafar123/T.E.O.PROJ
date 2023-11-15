const express = require("express");
const {
  getAllRacipes,
  createRacipe,
  updateRacipe,
  deleteRacipe,
  addRacipeToCategorie,
} = require("./controller");
const passport = require("passport");
const upload = require("../../middleware/multer");
const router = express.Router();

// token
router.get("/", getAllRacipes);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("recipeImage"),
  createRacipe
);
router.put("/:racipesId", updateRacipe);
router.delete("/:racipesId", deleteRacipe);
// router.put("/:racipesId/:CategorieId", addRacipeToCategorie);

module.exports = router;
