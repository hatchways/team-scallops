const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");

// @desc    Get all Notifications
// @route   GET /notifications
// @access  Private
exports.getNotifications = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = await Notification.findOne({ receiver: id });
  return res.status(200).json(user.notifications);
});

// @desc    Get Unread Notifications
// @route   GET /unreadnotifications
// @access  Private
exports.getUnReadNotifications = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = await Notification.findOne({ receiver: id });
  const unRead = user.notifications.filter(
    (notification) => notification.isRead === false
  );
  return res.status(200).json(unRead);
});

// @desc    Create a new notification
// @route   POST /notifications
// @access  Private
exports.createNotification = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { senderId } = req.params;
  const { title, message, type } = req.body;
  const userToNotify = await Notification.findOne({ receiver: id });

  if (!userToNotify) {
    await new Notification({
      receiver: id,
      notifications: [
        {
          type,
          sender: senderId,
          title,
          message,
        },
      ],
    }).save();
    return res.status(201).json(userToNotify);
  }
  const newNotification = {
    type,
    sender: senderId,
    title,
    message,
  };
  await userToNotify.notifications.unshift(newNotification);
  await userToNotify.save();
  return res.status(201).json(userToNotify);
});

// @desc    Update notification to read
// @route   Patch /notification/:receiverId/:notificationId
// @access  Private
exports.updateNotificationToRead = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { notificationId } = req.params;

  const user = await Notification.findOne({ receiver: id });

  if (user.notifications.length > 0) {
    const foundNotification = user.notifications.find(
      (notification) => notification._id.toString() === notificationId
    );

    if (foundNotification) {
      foundNotification.isRead = true;
      const updateNotification = await user.save();
      res.status(200).json(updateNotification);
    } else {
      res.status(400);
      throw new Error("No notification found");
    }
  }
});
