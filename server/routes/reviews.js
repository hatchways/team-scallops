const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { validatePostReview, validateGetAllReviews } = require("../validate");
const { postReview, getAllReviews } = require("../controllers/reviews");

router.route("/").post(protect, validatePostReview, postReview);
router.route("/:profileId").get(protect, validateGetAllReviews, getAllReviews);

module.exports = router;
