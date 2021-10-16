const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  profileCreatePost,
  profileUpdatePost,
  profileGet,
  profileGetAll,
} = require("../controllers/profile");
router.route("/create").post(protect, profileCreatePost);
router.route("/update").post(protect, profileUpdatePost);
router.route("/").get(protect, profileGet);
router.route("/all").get(protect, profileGetAll);

module.exports = router;
