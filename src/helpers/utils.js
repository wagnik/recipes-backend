var multer = require('multer');
var uuidv4 = require('uuid').v4;
var path = require('path');
var fs = require('fs');

var PUBLIC_DIR = require("./../config").PUBLIC_DIR;

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, PUBLIC_DIR);
  },
  filename: function(req, file, cb) {
      var fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + "-" + fileName);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    if (
      file.mimetype == "image/png" || 
      file.mimetype == "image/jpg" || 
      file.mimetype == "image/jpeg" || 
      file.mimetype === "image/svg+xml"
    ) {
      cb(null, true);
    } else {
      return cb(new Error('Only .png, .jpg, .jpeg and .svg format allowed!'));
    }
  }
});

var getImagegPath = function(req) {
  var url = req.protocol + '://' + req.get('host');

  return req.file ? url + PUBLIC_DIR + req.file.filename : req.body.img;
};

var deleteImageFromPublicFolder = function(image) {
  var imageName = path.basename(image);

  var imagePath = path.join(
    __dirname,
    '../../public',
    imageName
  );
  
  try {
    return fs.unlinkSync(imagePath);
  } catch (err) {
    throw new Error('Failed to delete the image.');
  }
};

module.exports = {
  deleteImageFromPublicFolder: deleteImageFromPublicFolder,
  getImagegPath: getImagegPath,
  upload: upload
};