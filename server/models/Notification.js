const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  notifications: [
    {
      type: {
        type: String,
        enum: ["serviceRequest", "serviceAvailable", "message"],
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
module.exports = Notification = mongoose.model(
  "Notification",
  notificationSchema
);
