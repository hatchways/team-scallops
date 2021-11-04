const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    reviewerProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    reviewedProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true,
    },
    starRating: {
      type: Number,
      min: 1,
      max: 5,
      set: (val) => Math.round(val),
      required: true,
    },
    text: String,
  },
  { timestamps: true }
);

module.exports = Message = mongoose.model("Review", reviewSchema);
