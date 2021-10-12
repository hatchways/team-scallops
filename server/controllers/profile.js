const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

exports.profile_create_post = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, description, availability } = req.query;

  if (!firstName || !lastName) {
    res.status(400);
    throw new Error("Invalid name");
  }
  await Profile.create({
    firstName,
    lastName,
    description,
    availability,
  });
});

exports.profile_update_post = function (req, res) {
  const { firstName, lastName, description, availability, id } = req.query;
  const idExists = await Profile.findOne({ id });

  if (idExists) {
    await Profile.updateOne(
      { _id: id },
      {
        firstName,
        lastName,
        description,
        availability,
      }
    );
    res.status(201);
  } else {
    res.status(400);
    throw new Error("Invalid profile update");
  }
};

exports.profile_get = asyncHandler(async (req, res, next) => {
  const { id } = req.query;

  let profile;
  if (id) {
    profile = await Profile.find({
      _id: { id },
    });
  }

  if (!id) {
    res.status(404);
    throw new Error("No profile found");
  }
  res.status(200).json({ profile: profile });
});

exports.profile_all_get = function (req, res) {
  profiles = await Profile.find();
  res.status(200).json({ profiles: profiles });
};
