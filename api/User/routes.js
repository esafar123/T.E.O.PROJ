const express = require("express");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  signup,
  signin,
} = require("./controller");
const passport = require("passport");
const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

// extra
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
