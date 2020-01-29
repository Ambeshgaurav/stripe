var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

var upload = multer({ storage: storage })
router.post('/upload', upload.single('firstfile'), function(req, res, next) {
  var fileinfo = req.file;
  var title = req.body;
  console.log(title);
  console.log(fileinfo);
  
  res.send(fileinfo);
})

module.exports = router;
