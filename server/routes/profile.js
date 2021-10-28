const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  post,
  patch,
  get,
  getSittersProfile,
  all,
} = require("../controllers/profile");
const { multerUploads } = require("../middleware/multer");

router.route("/").post(protect, multerUploads, post);
router.route("/").patch(protect, patch);
router.route("/").get(protect, get);
router.route("/:id").get(protect, getSittersProfile);
router.route("/all").get(protect, all);

module.exports = router;
