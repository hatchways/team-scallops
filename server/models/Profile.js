const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  firstName: {
    type: String
  },
  images: [{
    url: String,
    public_id: String
  }],
  
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);