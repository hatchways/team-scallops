const  express= require('express');
const router = express.Router();
const {multerUploads} =require('../middleware/multer')
const { createProfile } = require("../controllers/profile");


router.route('/').post(multerUploads,createProfile);

module.exports = router;