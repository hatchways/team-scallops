const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const {
  getRequests,
  createRequest,
  updateRequest,
} = require("../controllers/request");

router.route("/all").get(protect, getRequests);
router.route("/create").post(protect, createRequest);
router.route("/update/:id").put(protect, updateRequest);

module.exports = router;
