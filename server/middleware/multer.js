const multer = require('multer');
const path = require('path');
const DatauriParser = require("datauri/parser");

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("image");


const parser = new DatauriParser();


function convertBufferToString(req) {
    let file64;
     const extName = path.extname(req.file.originalname).toString();
    return  file64 = parser.format(extName, req.file.buffer);
}
module.exports = {multerUploads,convertBufferToString}




