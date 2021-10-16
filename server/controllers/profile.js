const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

exports.profileCreatePost = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    description,
    availability,
    gender,
    birthday,
    phone,
    address,
    available,
  } = req.body;
  const id = req.user.id;
  const email = req.user.email;
  if (!firstName || !lastName || !id) {
    res.status(400);
    throw new Error("Invalid name/ID");
  }
  console.log(req.user.id);
  console.log;
  const profile = await Profile.create({
    user: id,
    userId: id,
    firstName,
    lastName,
    description,
    availability,
    gender,
    birthday,
    phone,
    address,
    available,
  });
  res.status(201).json({ profile });
});

exports.profileUpdatePost = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    description,
    availability,
    gender,
    birthday,
    phone,
    address,
    available,
  } = req.body;
  const id = req.user.id;
  const idExists = await Profile.findOne({ userId: id });

  if (idExists) {
    const update = await Profile.updateOne(
      { userId: id },
      {
        firstName,
        lastName,
        description,
        availability,
        gender,
        birthday,
        phone,
        address,
        available,
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
  let profile;
  if (id) {
    profile = await Profile.findOne({ userId: id });
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
