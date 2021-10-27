const express = require("express");
const router = express.Router();
const {
  getNotifications,
  createNotification,
  getUnReadNotifications,
  updateNotificationToRead,
} = require("../controllers/notifications");
const protect = require("../middleware/auth");

router.route("/").get(protect, getNotifications);
router.route("/unread").get(protect, getUnReadNotifications);
router.route("/").post(protect, createNotification);
router.route("/:notificationId").patch(protect, updateNotificationToRead);

module.exports = router;
