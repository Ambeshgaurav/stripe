var request = require('request');
const express=require("express");
const app=express();
app.use(express.json());


  var options = {
    method:"post",
  url: 'https://rest.spryngsms.com/v1/messages?with[]=recipients',
  headers: {
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE3YTdjMmMyZGNkMTgyZGJlNWU5NmU1M2Y2OTNhOTk0NTFlZGQxYTBkYjAxNjMxN2M0YWQ1ZDZkYTM0NjgzNTQ1ZDViNWE3NThjMGMwOGQ2In0.eyJhdWQiOiIzIiwianRpIjoiMTdhN2MyYzJkY2QxODJkYmU1ZTk2ZTUzZjY5M2E5OTQ1MWVkZDFhMGRiMDE2MzE3YzRhZDVkNmRhMzQ2ODM1NDVkNWI1YTc1OGMwYzA4ZDYiLCJpYXQiOjE1ODAzNjI2MzUsIm5iZiI6MTU4MDM2MjYzNSwiZXhwIjoxNjExOTg1MDM1LCJzdWIiOiI2MjI3NSIsInNjb3BlcyI6W119.rgAeLKviyIyUYPB-A-sODIDWakFIZf6wLMIF4_d-MqfhJp5P55fVsmpLiKsKWRv-FCLlazKRUtO_KovzOn4fTG3VyTxckM3aHg_sZynP91gdfsLIUQfkDrjKN1yPnBc1pXtm09IOa3jXC9c2Dz-L8gImhqRwqLnUQGRwAdNdWsquvKqsR5Og5p4aWaCoVfo_HREhwC3CXAnhwTGyItZVVUMLRvfuBoFjgw-_zZ-6061874YJg0FD_5wuwEZ8ypmjcEI9QYmSOEJaR6CcPcdNJCol-HmHtMF8WIkGXnenrr-RZelKBqRBNUy3PSLDCTSa5J_mWMs8CNju1Un0HZpn-9SL3MXqmOhIS4ckOssXsdNd3MfM03PAFlzGff4nUCijgiNfVPLSzaclOwqmEZZFe0yvGQNmYDD5lK-U3rJL1n49ou87pVp479lXtPa5kjOPNqm1JWdfwtGp5O6--4NmVdUXtU-TTKdegZQmp8H2I-QOum7YRUnGIxCch_xcQf-m5e0xEw6VF4NJCIhV7i93GnblSYgwc3cakLlzGhQWX61ytB0vVVLpA8GA5VGa8cgdafU-3dovkE9oCTX1tzCegD31h-qKVHfncngCKToyKRjitey5h9JmgM9ZRYAfFrwG8xRZq1GVttfa84B3U-gFYdj-xqmi8rH6lujd5T9zAJw',
   'Content-Type':'application/json'
  },
  body: {
    
      "body": "This is a test message for every one don't be serious",
      "encoding": "unicode",
      "originator": "DocsTest",
      "recipients": [
          "+918896666937"
      ],
      "route": "1",
      "scheduled_at": "2019-01-01T15:00:00+02:00"
  },
json:true
};
function callback(error, response, body) {
    var info=body;   
    // // console.log("------------options-----",options);
    // console.log("-------------response======",body);
    
    
    if(error)
    {
      console.log(error);
    } 
    else if (!error && response.statusCode == 200) { 
      console.log(info);
  }
}
request(options, callback);








// app.listen(3093);
// console.log("server running at port number 3093");
// // // [62008116,62018507]
 // "block_status": 1

    // "email": "ambeshgaurav15@gmail.com",
    // "phone": "919888013929",
    // "transport_type": "1",
    // "transport_desc": "car",
    // "license": "demo",
    // "color": "blue",
    // "timezone": "-330",
    // "team_id": 271225,
    // "password": "abcdefg",
    // "username": "user123@34",
    // "first_name": "gaurav",
    // "last_name": "singh",
    // "rule_id": 70851
      // "fleet_id":497922,
    // {
      // "api_key": "2b997be77e2cc22becfd4c66426ef504",





      // eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE3YTdjMmMyZGNkMTgyZGJlNWU5NmU1M2Y2OTNhOTk0NTFlZGQxYTBkYjAxNjMxN2M0YWQ1ZDZkYTM0NjgzNTQ1ZDViNWE3NThjMGMwOGQ2In0.eyJhdWQiOiIzIiwianRpIjoiMTdhN2MyYzJkY2QxODJkYmU1ZTk2ZTUzZjY5M2E5OTQ1MWVkZDFhMGRiMDE2MzE3YzRhZDVkNmRhMzQ2ODM1NDVkNWI1YTc1OGMwYzA4ZDYiLCJpYXQiOjE1ODAzNjI2MzUsIm5iZiI6MTU4MDM2MjYzNSwiZXhwIjoxNjExOTg1MDM1LCJzdWIiOiI2MjI3NSIsInNjb3BlcyI6W119.rgAeLKviyIyUYPB-A-sODIDWakFIZf6wLMIF4_d-MqfhJp5P55fVsmpLiKsKWRv-FCLlazKRUtO_KovzOn4fTG3VyTxckM3aHg_sZynP91gdfsLIUQfkDrjKN1yPnBc1pXtm09IOa3jXC9c2Dz-L8gImhqRwqLnUQGRwAdNdWsquvKqsR5Og5p4aWaCoVfo_HREhwC3CXAnhwTGyItZVVUMLRvfuBoFjgw-_zZ-6061874YJg0FD_5wuwEZ8ypmjcEI9QYmSOEJaR6CcPcdNJCol-HmHtMF8WIkGXnenrr-RZelKBqRBNUy3PSLDCTSa5J_mWMs8CNju1Un0HZpn-9SL3MXqmOhIS4ckOssXsdNd3MfM03PAFlzGff4nUCijgiNfVPLSzaclOwqmEZZFe0yvGQNmYDD5lK-U3rJL1n49ou87pVp479lXtPa5kjOPNqm1JWdfwtGp5O6--4NmVdUXtU-TTKdegZQmp8H2I-QOum7YRUnGIxCch_xcQf-m5e0xEw6VF4NJCIhV7i93GnblSYgwc3cakLlzGhQWX61ytB0vVVLpA8GA5VGa8cgdafU-3dovkE9oCTX1tzCegD31h-qKVHfncngCKToyKRjitey5h9JmgM9ZRYAfFrwG8xRZq1GVttfa84B3U-gFYdj-xqmi8rH6lujd5T9zAJw




// var express = require('express');
// var router = express.Router();
// var multer = require('multer');

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname)
//   }
// })

// var upload = multer({ storage: storage })
// router.post('/upload', upload.single('firstfile'), function(req, res, next) {
//   var fileinfo = req.file;
//   var title = req.body;
//   console.log(title);
//   console.log(fileinfo);
  
//   res.send(fileinfo);
// })

// module.exports = router;
