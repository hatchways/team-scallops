const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  userId: {
    type: String,
    unique: true,
    required: true,
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
    type: String,
  },
  address: {
    type: String,
  },
  description: {
    type: String,
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
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
