const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

exports.profileCreatePost = asyncHandler(async (req, res) => {
  const { firstName, lastName, description, availability } = req.body;

  if (!firstName || !lastName) {
    res.status(400);
    throw new Error("Invalid name");
  }
  const profile = await Profile.create({
    firstName,
    lastName,
    description,
    availability,
  });
  res.status(201).json({ profile });
});

exports.profileUpdatePost = function (req, res) {
  const { firstName, lastName, description, availability, email } = req.body;
  const emailExists = Profile.findOne({ email });

  if (emailExists) {
    Profile.updateOne(
      { email },
      {
        firstName,
        lastName,
        description,
        availability,
      }
    );
    res.status(200);
  } else {
    res.status(500);
    throw new Error("Invalid profile update");
  }
};

exports.profileGet = asyncHandler(async (req, res) => {
  const email = req.params.email;

  let profile;
  if (email) {
    profile = Profile.find({
      email,
    });
  }

  if (!email) {
    res.status(404);
    throw new Error("No profile found");
  }
  res.status(200).json({ profile: profile });
});

exports.profileAllGet = function (req, res) {
  const profiles = Profile.find();
  res.status(200).json({ profiles: profiles });
};
