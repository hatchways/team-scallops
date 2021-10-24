const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");

// @desc    Get all Notifications
// @route   GET /notifications
// @access  Private
exports.getNotifications = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const userNotification = await Notification.findOne({ receiver: id });
  if (userNotification && userNotification.notifications.length > 0) {
    return res.status(200).json({
      result: userNotification.notifications.length,
      data: userNotification.notifications,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

// @desc    Get Unread Notifications
// @route   GET /notifications/unread
// @access  Private
exports.getUnReadNotifications = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const userNotification = await Notification.findOne({
    receiver: id,
  })
    .populate("notifications.sender")
    .select("email");

  if (userNotification && userNotification.notifications.length > 0) {
    const unReadNotifications = userNotification.notifications.filter(
      (notification) => notification.isRead === false
    );
    return res.status(200).json({
      result: unReadNotifications.length,
      data: userNotification,
    });
  } else {
    res.status(400);
    throw new Error("No unread notifications found");
  }
});

// @desc    Create a new notification
// @route   POST /notifications
// @access  Private
exports.createNotification = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { senderId, title, message, type } = req.body;
  if (!senderId || !title || !message || !type) {
    res.status(400);
    throw new Error("Invalid request");
  }
  const userNotification = await Notification.findOne({ receiver: id });

  if (!userNotification) {
    const newNotification = await new Notification({
      receiver: id,
      notifications: [
        {
          type,
          sender: senderId,
          title,
          message,
        },
      ],
    });
    await newNotification.save();
    return res.status(201).json({ data: newNotification });
  }
  const newNotification = {
    type,
    sender: senderId,
    title,
    message,
  };
  await userNotification.notifications.unshift(newNotification);
  await userNotification.save();
  return res.status(201).json(userNotification);
});

// @desc    Update notification to read
// @route   Patch /notification/:receiverId/:notificationId
// @access  Private
exports.updateNotificationToRead = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { notificationId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(notificationId)) {
    return res.status(400).send("Bad Request");
  }

  const userNotification = await Notification.findOne({ receiver: id });

  if (userNotification && userNotification.notifications.length > 0) {
    const foundNotification = userNotification.notifications.find(
      (notification) => notification._id.toString() === notificationId
    );

    if (foundNotification) {
      foundNotification.isRead = true;
      const updatedNotification = await userNotification.save();
      res.status(200).json({ data: updatedNotification });
    } else {
      res.status(400);
      throw new Error("No notification found");
    }
  }
});
