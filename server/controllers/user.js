const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @route POST /users
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const searchString = req.query.search;

  let users;
  if (searchString) {
    users = await User.find({
      username: { $regex: searchString, $options: "i" },
    });
  }

  if (!users) {
    res.status(404);
    throw new Error("No users found in search");
  }

  res.status(200).json({ users: users });
});

// @route GET /users/isSitter/
// @desc GET allowed parameters within User model
// @access Private
exports.getIsSitter = asyncHandler(async (req, res, next) => {
  const id = req.user.id;

  const user = await User.findById(id);
  const { isSitter } = user;

  res.status(200).json({ isSitter });
});

// @route PATCH /users/isSitter/
// @desc Update allowed parameters within User model
// @access Private
exports.setIsSitter = asyncHandler(async (req, res, next) => {
  const id = req.user.id;
  const isSitter = req.body.isSitter;
  if (isSitter) {
    const update = await User.updateOne({ _id: id }, { isSitter });
    res.status(200).json({ update });
  } else {
    res.status(500).json({ error: "error updating isSitter" });
  }
});
