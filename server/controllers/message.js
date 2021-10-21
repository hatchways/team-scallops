const Message = require("../models/Message");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @route POST /message/
// @desc Post new message
// @access Private
exports.postMessage = asyncHandler(async (req, res, next) => {
  const { conversationId, text } = req.body;
  const conversation = await User.findOne({ _id: conversationId });
  const userId = req.user.id;

  if (!conversation) {
    res.status(404);
    throw new Error("Conversation Id not found!");
  }

  const lastMessage = await Message.create({
    sendByUser: userId,
    text: text,
    conversation: conversation._id,
  });

  conversation.set({
    lastMessage: lastMessage,
  });
  conversation.save();

  res.status(200);
  res.json(lastMessage);
});
