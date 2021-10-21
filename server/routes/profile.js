const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { post, patch, get, all } = require("../controllers/profile");
router.route("/").post(protect, post);
router.route("/").patch(protect, patch);
router.route("/").get(protect, get);
router.route("/all").get(protect, all);

module.exports = router;
