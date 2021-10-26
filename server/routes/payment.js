const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { create } = require("../controllers/payment");
router.route("/").post(protect, payment);

module.exports = router;
