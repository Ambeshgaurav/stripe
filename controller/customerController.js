const customer_services = require('../services/customerServices')
const request = require('request')
const config_url = require('../config/url')
const promise = require('bluebird')


function createTask(req, res) {
  let body_data = req.body
  if(!body_data){
    return res.send({status:400, Error: "Missing Parameter"})
  }
  if(!body_data || !body_data.orders || !body_data.orders[0] || ! body_data.orders[0].fulfill_at
    || !body_data.orders[0].client_address){
    return res.send({status:400, Error: "Missing Parameter"})
    
  }
  var date = new Date(body_data.orders[0].fulfill_at).getTime();
  date += (1 * 60 * 60 * 1000);
  body_data.delivery_time = new Date(date);
  var sub_array = [];
  var main_array = [];
  for (i = 0; i < body_data.orders[0].items.length; i++) {
    sub_array = [{
      "val": body_data.orders[0].items[i].name,
      "head": "name"
    }, {
      "val": body_data.orders[0].items[i].price,
      "head": "price"
    },
    {
      "val": body_data.orders[0].items[i].quantity,
      "head": "quantity"
    }, {
      "val": body_data.orders[0].items[i].tax_value,
      "head": "tax_value"
    }
    ]
    main_array.push(sub_array);

  }
  body_data.body_array = main_array
  if(body_data.orders[0].restaurant_street && (body_data.orders[0].restaurant_street).length!=0 && 
  body_data.orders[0].restaurant_city &&
   (body_data.orders[0].restaurant_city).length!=0&& body_data.orders[0].restaurant_state &&
    (body_data.orders[0].restaurant_state).length!=0 && body_data.orders[0].restaurant_country && 
    (body_data.orders[0].restaurant_country).length!=0 && body_data.orders[0].restaurant_zipcode &&
     (body_data.orders[0].restaurant_zipcode).length!=0)
  {
    pickupAndDeliveryTask(req, res, body_data)
  }
  else 
  {
    deliveryTask(req, res, body_data)
  }
  
}
function deliveryTask(req, res, data) {
  var options = {
    method: "post",
    url: config_url.create_task,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      "api_key": config_url.api_key,
      "order_id": data.orders[0].id,
      "auto_assignment": '0',
      "customer_email": data.orders[0].client_email,
      "customer_username": (data.orders[0].client_first_name + ' ' + data.orders[0].client_last_name),
      "customer_phone": data.orders[0].client_phone,
      "customer_address": data.orders[0].client_address,
      "job_delivery_datetime":data.delivery_time,
      "latitude": data.orders[0].latitude,
      "longitude": data.orders[0].longitude,
      "has_pickup": '0',
      "has_delivery": '1',
      "layout_type": '0',
      "tracking_link": data.orders[0].tracking_link,
      "timezone": -330,
      "custom_field_template": 'items',
      "meta_data": [
        {
          "label": "payment",
          "data_type": "text",
          "data": data.orders[0].payment,
        },
        {
          "label": "currency",
          "data_type": "text",
          "data": data.orders[0].currency,
        },
        {
          "label": "total_price",
          "data_type": "text",
          "data": data.orders[0].total_price
        },
        {
          "label": "tax_value",
          "data_type": "text",
          "data": data.orders[0].tax_value
        },

        {
          "label": "order_details",
          "data_type": "Table",
          "data": {
            "head": [{
              "label": "name",
              "type": "text",
            }, {
              "label": "price",
              "type": "number"
            },
            {
              "label": "quantity",
              "type": "number"
            },
            {
              "label": "tax_value",
              "type": "number"
            },],
            "body": data.body_array
          }
        }],
      "fleet_id": "-",
      "notify": '1',
      "tags": '-',
      "geofence":'1',
      "ride_type": '-'
    },
    json: true
  };
  function callback(error, response, body) {
    var info = body;
    if (error) {
      console.log(error);
      res.send("error occurred")
    }
    else if (!error && response.statusCode == 200) {
      console.log(info);
      res.send(info)
    }
  }
  request(options, callback);

}
function pickupAndDeliveryTask(req, res, data) {
  var options = {
    method: "post",
    url: config_url.create_task,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      "api_key": config_url.api_key,
      "order_id": data.orders[0].id,
      "auto_assignment": '0',
      "job_description": 'food delivery',
      "job_pickup_phone": data.orders[0].restaurant_phone,
      "job_pickup_name": data.orders[0].restaurant_name,
      "job_pickup_email": '-',
      "job_pickup_address": (data.orders[0].restaurant_street + ' ' + data.orders[0].restaurant_city + ' ' + data.orders[0].restaurant_state + ' ' + data.orders[0].restaurant_country + ' ' + data.orders[0].restaurant_zipcode),
      "job_pickup_datetime": data.orders[0].fulfill_at,
      "job_pickup_latitude": data.orders[0].restaurant_latitude,
      "job_pickup_longitude": data.orders[0].restaurant_longitude,
      "customer_email": data.orders[0].client_email,
      "customer_username": (data.orders[0].client_first_name + ' ' + data.orders[0].client_last_name),
      "customer_phone": data.orders[0].client_phone,
      "customer_address": data.orders[0].client_address,
      "job_delivery_datetime": data.delivery_time,
      "latitude": data.orders[0].latitude,
      "longitude": data.orders[0].longitude,
      "has_pickup": '1',
      "has_delivery": '1',
      "layout_type": '0',
      "tracking_link": '1',
      "timezone": '-330',
      "custom_field_template": 'items',
      "meta_data": [

        {
          "label": "payment",
          "data_type": "text",
          "data": data.orders[0].payment,
        },
        {
          "label": "currency",
          "data_type": "text",
          "data": data.orders[0].currency,
        },
        {
          "label": "total_price",
          "data_type": "text",
          "data": data.orders[0].total_price
        },
        {
          "label": "tax_value",
          "data_type": "text",
          "data": data.orders[0].tax_value
        },

        {
          "label": "order_details",
          "data_type": "Table",
          "data": {
            "head": [{
              "label": "name",
              "type": "text",
            }, {
              "label": "price",
              "type": "number"
            },
            {
              "label": "quantity",
              "type": "number"
            },
            {
              "label": "tax_value",
              "type": "number"
            },],
            "body": data.body_array
          }
        }],
      "fleet_id": "-",
      "p_ref_images": [],
      "ref_images": [],
      "notify": '1',
      "tags": '-',
      "geofence": '1',
      "ride_type": '0'
    },
    json: true
  };
  function callback(error, response, body) {
    if (error) {
      console.log(error);
      res.send("error occurred")
    }
    else if (!error && response.statusCode == 200) {
      saveData(req, res, data, body)
    }
  }
  request(options, callback);

}
function saveData(req, res, req_data, res_data) {
  promise.coroutine(function* () {

    var save_data = yield customer_services.saveData(req_data, res_data)
    if (save_data == 1) {
      console.log(res_data);
      res.send(res_data)

    }

  })().catch((err) => {
    console.log(err)
    res.send(err);
  });

}

module.exports = {
  createTask: createTask
}