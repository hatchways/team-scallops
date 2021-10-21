const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sendByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversation",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Message = mongoose.model("message", messageSchema);
