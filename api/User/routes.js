const express = require("express");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  signup,
  signin,
} = require("./controller");
const passport = require("passport");
const upload = require("../../middleware/multer");
const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", upload.single("image"), signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

// extra + where is passport strategy here
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
