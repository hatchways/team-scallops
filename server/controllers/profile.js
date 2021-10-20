const Profile = require( '../models/Profile')
const asyncHandler = require("express-async-handler");
const Cloudinary = require('cloudinary')
const {convertBufferToString}=require('../middleware/multer')


//@route  Post /Profile
//@desc    Create or update users profile
//@access   private

exports.createProfile = asyncHandler(async (req, res) => {

  if (req.file) {
    cloudinaryImg = await Cloudinary.v2.uploader.upload(convertBufferToString(req).content);
    req.body.profile.image = {
      url: cloudinaryImg.secure_url,
      public_id: cloudinaryImg.public_id
     } 
  }
  let profile = await Profile.create(req.body.profile)     
     res.json({
         profile
    });
    
  });
  