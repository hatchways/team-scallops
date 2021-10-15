const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  userName: {
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
  email: {
    type: String,
    required: true,
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
    type: String,
  },
  available: {
    type: Boolean,
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
