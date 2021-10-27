const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
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
      default: false,
    },
    tuesday: {
      type: Boolean,
      required: true,
      default: false,
    },
    wednesday: {
      type: Boolean,
      required: true,
      default: false,
    },
    thursday: {
      type: Boolean,
      required: true,
      default: false,
    },
    friday: {
      type: Boolean,
      required: true,
      default: false,
    },
    saturday: {
      type: Boolean,
      required: true,
      default: false,
    },
    sunday: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  available: {
    type: Boolean,
    default: false,
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
