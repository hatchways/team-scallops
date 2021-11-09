const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "user",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    url: String,
    publicId: String,
  },
  availability: {
    monday: {
      type: Boolean,
      required: true,
      default: true,
    },
    tuesday: {
      type: Boolean,
      required: true,
      default: true,
    },
    wednesday: {
      type: Boolean,
      required: true,
      default: true,
    },
    thursday: {
      type: Boolean,
      required: true,
      default: true,
    },
    friday: {
      type: Boolean,
      required: true,
      default: true,
    },
    saturday: {
      type: Boolean,
      required: true,
      default: true,
    },
    sunday: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  available: {
    type: Boolean,
    default: true,
  },
  averageRating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5,
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
