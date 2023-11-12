const express = require("express");
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("./controller");
const router = express.Router();

router.get("/", getAllUsers);
// missing the token part
router.post("/", createUser);
// extra
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
