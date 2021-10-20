const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/User");

exports.getNotifi = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await Notification.findOne({ receiver: id })
    .populate("notifications.user")
    .populate("notifications.post");

  return res.json(user.notifications);
});

const setIsReadtoTrue = async (id) => {
  const user = await Notification.findOne({ receiver: id });

  user.notifications.isRead = true;
  await user.save();
};
exports.postNotifi = asyncHandler(async (req, res) => {
  const { revId, sendId } = req.params;
  const { title, message } = req.body;

  const notificationTest = {
    type: "serviceRequest",
    receiver: revId,
    sender: sendId,
    title,
    message,
  };
  const user = await Notification.findOne({ receiver: revId });
  if (!user) {
    await new Notification({
      receiver: revId,
      notifications: [],
    }).save();
  }

  await user.notifications.unshift(notificationTest);
  await user.save();

  await setIsReadtoTrue(revId);

  return res.json(user);
});
