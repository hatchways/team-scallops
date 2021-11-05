const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const { stripeSetup } = require("./payments");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../utils/sendEmail");

// @route POST /auth/register
// @desc Register user
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error("A user with that email already exists");
  }

  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    res.status(400);
    throw new Error("A user with that username already exists");
  }
  const stripeCustomerId = await stripeSetup(email);

  const user = await User.create({
    username,
    email,
    password,
    stripeCustomerId,
  });
  if (user) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    });

    res.status(201).json({
      success: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          stripeCustomerId,
          isSitter: user.isSitter,
        },
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route POST /auth/login
// @desc Login user
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    });

    res.status(200).json({
      success: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          isSitter: user.isSitter,
        },
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @route GET /auth/user
// @desc Get user data with valid token
// @access Private
exports.loadUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({
    success: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isSitter: user.isSitter,
      },
    },
  });
});

// @route GET /auth/logout
// @desc Logout user
// @access Public
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");

  res.send("You have successfully logged out");
});

// @route POST /auth/forgot
// @desc Send reset password link to selected email
// @access Public
exports.sendResetLink = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!email) {
      res.status(400).send({ error: "Email is required" });
    }

    if (!validator.isEmail(email)) {
      res.status(400).send({ error: "Invalid email" });
    }
    if (!user) {
      res.status(404).send({ error: "User not found" });
    }

    const token = generateToken(user._id);
    const link = `${req.protocol}://localhost:3001/reset/${token}`;

    await sendEmail(
      email,
      "mariana.teia.cloud@gmail.com",
      "Reset your password",
      `<div>Click the link below to reset your password</div><br/>
      <div>${link}</div>
      `
    );

    res.status(200).send({
      message: "Password reset link has been successfullly sent to your inbox",
    });
  } catch (e) {
    next(new Error(e));
  }
});

// @route POST /auth/reset/:token
// @desc Reset password
// @access Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  try {
    let { password: plainPassword } = req.body;

    const { token } = req.params;
    const decoded = jwt.decode(token);

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(404).send({ error: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plainPassword, salt);

    const updatedUser = await User.updateOne(
      { _id: decoded.id },
      { $set: { password: hash } },
      { new: true }
    );

    res.status(200).send({ token, updatedUser });
  } catch (e) {
    next(new Error(e));
  }
});
