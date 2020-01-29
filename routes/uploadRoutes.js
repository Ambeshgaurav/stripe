const router = require("express").Router();
const upload_controller=require('../controller/uploadController')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });
var multer_middleware=require('../multer/multer')







router.post('/singleFile',multer_middleware.upload.single('filename'),upload_controller.uploadSingleFile);
router.post('/multipleFile',multipartMiddleware, upload_controller.uploadMultipleFiles);


module.exports=router
