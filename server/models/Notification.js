const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  notifications: [
    {
      type: {
        type: String,
        enum: ["serviceRequest", "serviceAvailable", "message"],
      },
      senderProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
      },
      title: {
        type: String,
      },
      message: {
        type: String,
      },
      isRead: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    },
  ],
});
module.exports = Notification = mongoose.model(
  "Notification",
  notificationSchema
);
