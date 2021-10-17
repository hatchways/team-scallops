const Profile = require( '../models/Profile')
const asyncHandler = require("express-async-handler");
const cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'dog-sitter', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });


//@route  Post /Profile
//@desc    Create or update users profile
//@access   private

exports.createProfile = asyncHandler(async (req, res) => {
  console.log(req.files)
   req.body.profile.images=[]
  for (const file of req.files) {
   
    let image = await cloudinary.v2.uploader.upload(file.path) 
         req.body.profile.images.push({
             url: image.secure_url,
             public_id: image.public_id
         })
  }
     let profile = await Profile.create(req.body.profile)     
     res.json({
         profile
    });
 
  });
  