const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @route GET /conversation/
// @desc Get the requested conversation of the current user (with messages)
// @access Private
exports.getConversation = asyncHandler(async (req, res, next) => {
  const { conversationId } = req.body;
  const conversation = await Conversation.findOne({
    _id: conversationId,
  });

  if (!conversation) {
    res.status(404);
    throw new Error(
      `could not find a conversation for the provided id ${conversationId}`
    );
  }

  const messagesArray = await Messages.find({
    conversation: conversation._id,
  }).populate("sendByUser", "usename email");

  res.status(200);
  res.json(messagesArray);
});

// @route POST /conversation/
// @desc Post new message
// @access Private
exports.postConversation = asyncHandler(async (req, res, next) => {
  const { conversationId, text } = req.body;
  const conversation = await User.findOne({ _id: conversationId });
  const userId = req.user.id;
});

// @route GET /conversation/all
// @desc Get all conversations of the current user (without messages)
// @access Private
exports.getAllConversations = asyncHandler(async (req, res, next) => {
  const { conversationId, text } = req.body;
  const conversation = await User.findOne({ _id: conversationId });
  const userId = req.user.id;
});
