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
  const reviewerUserId = req.user.id;

  console.log("Until here 1");

  const reviewedProfile = await Profile.findById(reviewedProfileId);

  // find reviewerUserObj
  const reviewerUser = await User.findById(reviewerUserId);

  console.log("reviewerUserId : " + reviewerUserId);
  console.log("reviewedProfile.user : " + reviewedProfile.user);

  // const reviewerProfile = await Profile.findOne({ user: reviewerUserId });
  const requestObject = await Request.findOne({
    $or: [
      { $and: [{ owner: reviewerUserId }, { sitter: reviewedProfile.user }] },
      { $and: [{ owner: reviewedProfile.user }, { sitter: reviewerUserId }] },
    ],
  });

  console.log("Until here 2");
  console.log(requestObject);

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
  console.log("Until here 3");
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
  console.log("Until here 4");

  // console.log(reviewerUser);

  const newReview = {
    reviewerProfileId: reviewerUser.profile,
    reviewedProfileId: reviewedProfile._id,
    requestId: requestObject._id,
    starRating: starRating,
    text: text,
  };

  console.log(newReview);

  // const newReview = await Review.create({
  //   reviewerProfileId: reviewerUser.profile._id,
  //   reviewedProfileId: reviewedProfile._id,
  //   requestId: requestObject._id,
  //   starRating,
  //   text,
  // });

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
