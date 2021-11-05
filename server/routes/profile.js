const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  post,
  patch,
  get,
  getSittersProfile,
  all,
  getPopulated,
} = require("../controllers/profile");
const { multerUploads } = require("../middleware/multer");

router.route("/populated").get(protect, getPopulated);
router.route("/").post(protect, post);
router.route("/").patch(protect, patch);
router.route("/").get(protect, get);
router.route("/all").get(protect, all);
router.route("/profile/:id").get(getSittersProfile);

module.exports = router;
