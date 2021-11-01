const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

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
    await message.save();
  } catch (error) {}
};
