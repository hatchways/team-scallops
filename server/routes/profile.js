const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { multerUploads } = require("../middleware/multer");
const {
  profileCreatePost,
  profileUpdatePatch,
  profileGet,
  profileGetAll,
} = require("../controllers/profile");

router.route("/").post(protect, multerUploads, profileCreatePost);
router.route("/").patch(protect, profileUpdatePatch);
router.route("/").get(protect, profileGet);
router.route("/all").get(protect, profileGetAll);

module.exports = router;
