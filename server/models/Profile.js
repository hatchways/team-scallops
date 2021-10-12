const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  availability: {
    type: Array,
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
