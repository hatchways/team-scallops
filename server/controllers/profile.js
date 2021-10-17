const Profile = require( '../models/Profile')
const asyncHandler = require("express-async-handler");
const cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'dog-sitter', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });


//@route  Post api/Profile
//@desc    Create or update users profile
//@access   private

exports.createProfile = asyncHandler(async (req, res) => {
req.body.images=[]
  for (const file of req.files) {
   
    let image = await cloudinary.v2.uploader.upload(file.path)
   
         req.body.images.push({
             url: image.secure_url,
             public_id: image.public_id
         })
  }
  console.log(req.file)
     let profile = await Profile.create(req.body)     
     res.json({
         profile
    });
 
  });
  