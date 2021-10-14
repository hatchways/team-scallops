const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

exports.profileCreatePost = asyncHandler(async (req, res) => {
  const { firstName, lastName, description, availability, email, userName } =
    req.body;

  if (!firstName || !lastName) {
    res.status(400);
    throw new Error("Invalid name");
  }
  const profile = await Profile.create({
    userName,
    firstName,
    email,
    lastName,
    description,
    availability,
  });
  res.status(201).json({ profile });
});

exports.profileUpdatePost = asyncHandler(async (req, res) => {
  const { firstName, lastName, description, availability, email } = req.body;
  const emailExists = await Profile.findOne({ email });

  if (emailExists) {
    const update = await Profile.updateOne(
      { email },
      {
        firstName,
        lastName,
        description,
        availability,
      }
    );
    res.status(200).json({ update: update });
  } else {
    res.status(500);
    throw new Error("Invalid profile update");
  }
});

exports.profileGet = asyncHandler(async (req, res) => {
  const userName = req.params.userName || req.body.userName;

  let profile;
  if (userName) {
    profile = await Profile.find({ userName: userName });
  }

  if (!userName) {
    res.status(404);
    throw new Error("No user found");
  }
  res.status(200).json({ profile: profile });
});

exports.profileGetAll = asyncHandler(async (req, res) => {
  const profiles = await Profile.find();
  res.status(200).json({ profiles: profiles });
});
