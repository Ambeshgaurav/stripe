// var request = require('request');
const express=require("express");
const app=express();
const routes=require('./router/routes')
app.use(express.json());

app.use('/customer',routes);
app.listen(3099);
console.log("server running at the port number 3099");



//   var options = {
//     method:"post",
//   url: 'https://api.tookanapp.com/v2/create_task',
//   headers: {
//    'Content-Type':'application/json'
//   },
//   body: {
  //   "api_key": "50656285f04b4a0b544628305f4c25431bedc4fa2adb7c365b1f05",
  //   "order_id": "654321",
  //   // "team_id": "",
  //   "auto_assignment": "0",
  //   "job_description": "groceries delivery",
  //   "job_pickup_phone": "+1201555555",
  //   "job_pickup_name": "7 Eleven Store",
  //   "job_pickup_email": "",
  //   "job_pickup_address": "Net2source Graphene IT Park Plot No 16, Sector 22, Panchkula, Haryana",
  //   // "job_pickup_latitude": "30.7188978",
  //   // "job_pickup_longitude": "76.810296",
  //   "job_pickup_datetime": "2020-01-1cls6 19:00:00",
  //   "customer_email": "john@example.com",
  //   "customer_username": "John Doe",
  //   "customer_phone": "+12015555555",
  //   "customer_address": "Nada sahib, Panchkula, Haryana 134109",
  //   // "latitude": "30.7188978",
  //   // "longitude": "76.810298",
  //   "job_delivery_datetime": "2020-01-17 21:00:00",
  //   "has_pickup": "1",
  //   "has_delivery": "1",
  //   "layout_type": "0",
  //   "tracking_link": 1,
  //   "timezone": "-330",
  //   "custom_field_template": "fare",
  //   "meta_data": [
  //     {
  //       "label": "amount",
  //       "data": "100"
  //     },
  //     // {
  //     //   "label": "amount",
  //     //   "data": "200"
  //     // }
  //   ],
  //   // "pickup_custom_field_template": "Template_2",
  //   // "pickup_meta_data": [
  //   //   {
  //   //     "label": "Price",
  //   //     "data": "100"
  //   //   },
  //   //   {
  //   //     "label": "Quantity",
  //   //     "data": "100"
  //   //   }
  //   // ],
  //   "fleet_id": "",
  //   "p_ref_images": [
  //     "http://tookanapp.com/wp-content/uploads/2015/11/logo_dark.png",
  //     "http://tookanapp.com/wp-content/uploads/2015/11/logo_dark.png"
  //   ],
  //   "ref_images": [
  //     "http://tookanapp.com/wp-content/uploads/2015/11/logo_dark.png",
  //     "http://tookanapp.com/wp-content/uploads/2015/11/logo_dark.png"
  //   ],
  //   "notify": 1,
  //   "tags": "",
  //   "geofence": 1,
  //   "ride_type": 0
  // },
// json:true
// };
// function callback(error, response, body) {
//     var info=body;   
//     if(error)
//     {
//       console.log(error);
//     } 
//     else if (!error && response.statusCode == 200) { 
//       console.log(info);
//   }
// }
// request(options, callback);


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

