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

router.route("/").post(protect, post);
router.route("/").patch(protect, patch);
router.route("/").get(protect, get);
router.route("/:id").get(getSittersProfile);
router.route("/all").get(protect, all);

module.exports = router;
