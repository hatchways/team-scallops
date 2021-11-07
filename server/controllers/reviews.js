const Profile = require("../models/Profile");
const Request = require("../models/Request");
const Review = require("../models/Review");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @route POST /reviews/
// @desc Post new review for a profile
// @access Private
exports.postReview = asyncHandler(async (req, res, next) => {
  const { reviewedProfileId, starRating, text } = req.body;
  const reviewedProfile = await Profile.findById(reviewedProfileId);
  const reviewerUserId = req.user.id;
  const reviewerUser = await User.findById(reviewerUserId);

  const prevReview = await Review.findOne({
    $and: [
      { reviewerProfileId: reviewerUser.profile },
      { reviewedProfileId: reviewedProfile._id },
    ],
  });

  const requestObject = await Request.findOne({
    $or: [
      { $and: [{ owner: reviewerUserId }, { sitter: reviewedProfile.user }] },
      { $and: [{ owner: reviewedProfile.user }, { sitter: reviewerUserId }] },
    ],
  });

  if (!!prevReview) {
    res.status(400);
    throw new Error("Review already posted for this profile!");
  }

  if (!requestObject) {
    res.status(400);
    throw new Error("Invalid provided requestId");
  }
  if (!(requestObject.status === "PAID")) {
    res.status(401);
    throw new Error("Review only allowed on completed request status");
  }

  if (!reviewedProfile) {
    res.status(400);
    throw new Error("Invalid provided profileId");
  }
  if (!reviewerUser) {
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
    reviewerProfileId: reviewerUser.profile,
    reviewedProfileId: reviewedProfile._id,
    requestId: requestObject._id,
    starRating,
    text,
  });

  const allReviews = await Review.find({
    reviewedProfileId: reviewedProfile._id,
  });

  const averageStar =
    allReviews.reduce((total, review) => total + review.starRating, 0) /
    allReviews.length;

  reviewedProfile.averageRating = averageStar;
  await reviewedProfile.save();

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
