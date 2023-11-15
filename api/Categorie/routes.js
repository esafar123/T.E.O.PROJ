const express = require("express");
const {
  getAllCategories,
  createCategorie,
  updateCategorie,
  deleteCategorie,
} = require("./controller");
const passport = require("passport");
const router = express.Router();

router.get("/", getAllCategories);
router.post("/", createCategorie);
router.put(
  "/:CategorieId",
  passport.authenticate("jwt", { session: false }),
  updateCategorie
);
// category should never be delted
// router.delete(
//   "/:CategorieId",
//   passport.authenticate("jwt", { session: false }),
//   updateCategorie
// );
module.exports = router;
