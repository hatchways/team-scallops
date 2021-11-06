const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  searchUsers,
  setIsSitter,
  getIsSitter,
} = require("../controllers/user");

router.route("/").get(protect, searchUsers);
router.route("/isSitter/").get(protect, getIsSitter);
router.route("/isSitter/").patch(protect, setIsSitter);

module.exports = router;
