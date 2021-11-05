const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");
const { convertBufferToString } = require("../middleware/multer");
const Cloudinary = require("cloudinary");

exports.post = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const email = req.user.email;
  const {
    firstName,
    lastName,
    gender,
    birthday,
    phone,
    address,
    description,
    availability,
    available,
    image,
  } = req.body;
  if (!firstName || !lastName || !id) {
    res.status(400);
    throw new Error("Invalid request," + firstName, lastName, id);
  }

  const profile = await Profile.create({
    user: id,
    firstName,
    lastName,
    gender,
    birthday,
    phone,
    address,
    description,
    availability,
    available,
    image,
  });
  res.status(201).json({ profile });
});

exports.patch = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    birthday,
    phone,
    address,
    description,
    availability,
    available,
  } = req.body;
  const id = req.user.id;
  const idExists = await Profile.findOne({ user: id });

  if (idExists) {
    const update = await Profile.updateOne(
      { user: id },
      {
        firstName,
        lastName,
        gender,
        birthday,
        phone,
        address,
        description,
        availability,
        available,
      }
    );
    res.status(200).json({ update: update });
  } else {
    res.status(500);
    throw new Error("Invalid profile update");
  }
});

exports.get = asyncHandler(async (req, res) => {
  const id = req.user.id;
  let profile;
  if (id) {
    profile = await Profile.findOne({ user: id });
  }

  if (!id) {
    res.status(404);
    throw new Error("No user found");
  }
  res.status(200).json({ profile: profile });
});

exports.getSittersProfile = asyncHandler(async (req, res) => {
  const sitterId = req.params.id;

  let profile;
  if (sitterId) {
    profile = await Profile.findById(sitterId);
  }

  if (!sitterId) {
    res.status(404);
    throw new Error("No sitter found");
  }
  res.status(200).json({ profile: profile });
});

exports.all = asyncHandler(async (req, res) => {
  const profiles = await Profile.find();
  res.status(200).json({ profiles: profiles });
});
