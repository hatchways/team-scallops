const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  secret,
  processPayment,
  addCard,
  getCards,
  UpdateDefaultCard,
} = require("../controllers/payments");

router.route("/add").post(protect, addCard);
router.route("/").get(protect, getCards);
router.route("/:cardId").patch(protect, UpdateDefaultCard);
module.exports = router;
