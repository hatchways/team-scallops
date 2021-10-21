const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
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

  const messagesArray = await Message.find({
    conversation: conversation._id,
  }).populate("sendByUser", "usename email");

  res.status(200);
  res.json(messagesArray);
});

// @route POST /conversation/
// @desc Post new conversation
// @access Private
exports.postConversation = asyncHandler(async (req, res, next) => {
  const { receiverId } = req.body;
  const userId = req.user.id;

  const checkOldConversation = await Conversation.findOne({
    $or: [
      { $and: [{ firstUser: userId }, { secondUser: receiverId }] },
      { $and: [{ firstUser: receiverId }, { secondUser: userId }] },
    ],
  });

  if (checkOldConversation) {
    res.status(409);
    throw new Error(
      `conversation already exists between user ${userId} and ${receiverId} with Id ${checkOldConversation._id}`
    );
  }

  const newConversation = await Conversation.create({
    firstUser: userId,
    secondUser: receiverId,
    lastMessage: null,
  });

  await newConversation
    .populate("firstUser", "username email")
    .populate("secondUser", "username email")
    .execPopulate();

  res.status(201);
  res.json(newConversation);
});

// @route GET /conversation/all
// @desc Get all conversations of the current user (without messages)
// @access Private
exports.getAllConversations = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const allConversations = await Conversation.find({
    $or: [{ firstUser: userId }, { secondUser: userId }],
  })
    .populate("firstUser", "username email")
    .populate("secondUser", "username email")
    .populate({
      path: "lastMessage",
      populate: { path: "sendByUser", select: "username email" },
    });

  if (!allConversations) {
    res.status(404);
    throw new Error(`no conversation was found for user Id ${userId}`);
  }

  res.status(200);
  res.json(allConversations);
});
