const express = require("express");
const {
  getAllCategories,
  createCategorie,
  updateCategorie,
  deleteCategorie,
} = require("./controller");
const router = express.Router();

router.get("/", getAllCategories);
router.post("/", createCategorie);
router.put("/:CategorieId", updateCategorie);
// category should never be delted
router.delete("/:CategorieId", deleteCategorie);

module.exports = router;
