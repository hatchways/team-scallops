const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getConversation,
  postConversation,
  getAllConversations,
} = require("../controllers/conversation");

router.route("/:conversationId").get(protect, getConversation);

router.route("/").get(protect, getAllConversations);

router.route("/").post(protect, postConversation);

module.exports = router;
