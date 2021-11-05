const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { secret } = require("../controllers/payments");

router.route("/secret").post(protect, secret);
module.exports = router;
