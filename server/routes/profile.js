const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  ProfileCreatePost,
  ProfileUpdatePost,
  ProfileGet,
  ProfileGetAll,
} = require("../controllers/profile");

router.route("/create").post(protect, ProfileCreatePost);
router.route("/update").post(protect, ProfileUpdatePost);
router.route("/").get(protect, ProfileGet);
router.route("/all").get(protect, ProfileGetAll);

module.exports = router;
