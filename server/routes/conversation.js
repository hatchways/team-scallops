const express = require("express");
const router = express.Router();
// const { validateRegister, validateLogin } = require('../validate');
const protect = require("../middleware/auth");
const {
  getConversation,
  postConversation,
  getAllConversations,
} = require("../controllers/conversation");

router.route("/").get(protect, getConversation);

router.route("/").post(protect, postConversation);

router.route("/all").get(protect, getAllConversations);

module.exports = router;
