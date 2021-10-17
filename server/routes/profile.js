const  express= require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ 'dest': 'uploads/' })

const { createProfile } = require("../controllers/profile");


router.route('/').post( upload.array('images',4),createProfile);

module.exports = router;