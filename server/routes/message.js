const express = require("express");
const router = express.Router();
// const { validateRegister, validateLogin } = require('../validate');
const protect = require("../middleware/auth");
const { postMessage } = require("../controllers/message");

router.route("/").post(protect, postMessage);

module.exports = router;
