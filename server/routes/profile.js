const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { post, patch, get, all } = require("../controllers/profile");
const { multerUploads } = require("../middleware/multer");

router.route("/").get(protect, get);
router.route("/").post(protect, post);
router.route("/").patch(protect, patch);
router.route("/all").get(all);
router.route("/:id").get(get);

module.exports = router;
