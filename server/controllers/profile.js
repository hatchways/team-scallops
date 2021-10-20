const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");
const Cloudinary = require("cloudinary");
const { convertBufferToString } = require("../middleware/multer");

//@route  Post /Profile
//@desc    Create or update users profile
//@access   private

exports.profileCreatePost = asyncHandler(async (req, res) => {
  if (req.file) {
    cloudinaryImg = await Cloudinary.v2.uploader.upload(
      convertBufferToString(req).content
    );
    req.body.image = {
      url: cloudinaryImg.secure_url,
      public_id: cloudinaryImg.public_id,
    };
  }
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
  const id = req.user.id;

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

exports.profileUpdatePatch = asyncHandler(async (req, res) => {
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

exports.profileGet = asyncHandler(async (req, res) => {
  const id = req.user.id;
  let profile;
  if (id) {
    console.log(id);
    profile = await Profile.findOne({ user: id });
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
