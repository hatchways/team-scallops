const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

exports.profileCreatePost = asyncHandler(async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    description,
    availability,
    email,
    username,
  } = req.body;

  if (!firstName || !lastName) {
    res.status(400);
    throw new Error("Invalid name");
  }
  const profile = await Profile.create({
    _id,
    username,
    firstName,
    email,
    lastName,
    description,
    availability,
  });
  res.status(201).json({ profile });
});

exports.profileUpdatePost = asyncHandler(async (req, res) => {
  const { firstName, lastName, description, availability, email } = req.params;
  const idExists = await Profile.findOneById(id);

  if (idExists) {
    const update = await Profile.updateOneById(
      { id },
      {
        username,
        firstName,
        email,
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
  const id = req.params.id ? req.params.id : req.user.id;
  console.log(req.params);
  let profile;
  if (id) {
    profile = await Profile.findOneById(id);
  }

  if (!id) {
    res.status(404);
    throw new Error("No user found");
  }
  res.status(200).json({ profile: profile });
});

exports.profileGetAll = asyncHandler(async (req, res) => {
  const profiles = await Profile.find();
  res.status(200).json({ profiles: profiles });
});
