// const keyPublishable = 'pk_test_YaBc4RmjzB708NGJacEvvEIf00BjVTCdgz';
// const keySecret = 'sk_test_VVRYeNKW6JACshtFGWml21qX00MDXmlMyk';
const stripe = require("stripe");

function getToken(cardData,key) {
  console.log(cardData,key);
  
  var Stripe=stripe('pk_test_YaBc4RmjzB708NGJacEvvEIf00BjVTCdgz')
  // console.log(cardData,key);
  
  return new Promise((resolve, reject) => {
    Stripe.tokens.create(cardData, (err, data) => {
      if (err)
        reject(err);
      else
        resolve(data.id);
    });
  });
}
let createCustomer = (customerData,key) => {
  console.log(key.secretkey);
  
  var Stripe=stripe(key.secretkey)
  return new Promise(async (resolve, reject) => {
    Stripe.customers.create(customerData, function (err, customer) {
      if (err)
        reject(err);
      else
        resolve(customer);
    });
  });
}
let CreateCharge = (data,key) => {
  var Stripe=stripe(key.secretkey)
  return new Promise((resolve, reject) => {
    Stripe.charges.create(data, (err, charge) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(charge)
      }
    })

  })

}
exports.task = {
  getToken: getToken,
  createCustomer: createCustomer,
  CreateCharge: CreateCharge
}

