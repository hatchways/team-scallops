const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Notification = require("../models/Notification");

const sendMsg = async (userId, msgSendToUserId, msg) => {
  try {
    const conversation = await Conversation.findOne({ firstUser: userId });

    const msgSendToUser = await Conversation.findOne({
      secondUser: msgSendToUserId,
    });

    const newMsg = {
      sender: userId,
      text: msg,
      conversation: conversation._id,
    };
    const message = await Message.create(newMsg);
    const newMsg = await message.save();
    return { newMsg };
  } catch (error) {
    return { error };
  }
};

const sendNotification = async (notificationId, userId) => {
  try {
    const notification = await Notification.findOne(notificationId);
  } catch (error) {
    return { error };
  }
};
