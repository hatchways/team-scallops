const Profile = require("../models/Profile");
const Request = require("../models/Request");
const Review = require("../models/Review");
const asyncHandler = require("express-async-handler");

// @route POST /reviews/
// @desc Post new review for a profile
// @access Private
exports.postReview = asyncHandler(async (req, res, next) => {
  const { reviewedProfileId, requestId, starRating, text } = req.body;
  const reviewerUserId = req.user.id;

  const reviewedProfile = await Profile.findById(reviewedProfileId);
  const reviewerProfile = await Profile.findOne({ user: reviewerUserId });
  const requestObject = await Request.findById(requestId);

  if (!(requestObject.status === "PAID")) {
    res.status(401);
    throw new Error("Review only allowed on completed request status");
  }
  if (!requestObject) {
    res.status(400);
    throw new Error("Invalid provided requestId");
  }

  if (!reviewedProfile) {
    res.status(400);
    throw new Error("Invalid provided profileId");
  }
  if (!reviewerProfile) {
    res.status(400);
    throw new Error("Invalid user profileId");
  }

  if (
    !(
      (requestObject.sitter.equals(reviewedProfile.user) &&
        requestObject.owner.equals(reviewerUserId)) ||
      (requestObject.sitter.equals(reviewerUserId) &&
        requestObject.owner.equals(reviewedProfile.user))
    )
  ) {
    res.sendStatus(401);
    throw new Error(
      "Both parties must be part of the Request and have opposite roles"
    );
  }

  const newReview = await Review.create({
    reviewerProfileId: reviewerProfile._id,
    reviewedProfileId: reviewedProfile._id,
    requestId: requestObject._id,
    starRating,
    text,
  });

  return res.status(201).json({ success: { review: newReview } });
});

// @route GET /reviews/:profileId
// @desc Get existing reviews for a profileId
// @access Private
exports.getAllReviews = asyncHandler(async (req, res, next) => {
  const profileId = req.params.profileId;

  const allReviews = await Review.find({ reviewedProfileId: profileId })
    .populate("reviewerProfileId")
    .exec();

  res.status(200);
  res.json({ success: { reviews: allReviews } });
});
