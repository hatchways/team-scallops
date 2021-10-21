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
router.route("/unread/:id").get(protect, getUnReadNotifications);
router.route("/:senderId").post(protect, createNotification);
router.route("/:notificationId").patch(protect, updateNotificationToRead);

module.exports = router;
