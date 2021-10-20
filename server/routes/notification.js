const express = require("express");
const router = express.Router();
const { getNotifi, postNotifi } = require("../controllers/notifications");
const protect = require("../middleware/auth");

router.route("/:id").get(getNotifi);
router.route("/:revId/:sendId").post(postNotifi);

module.exports = router;