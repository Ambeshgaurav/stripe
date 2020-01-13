const promise = require("bluebird");
const bcrypt = require("bcryptjs")
const servicemysql = require('../services/promiseservicemysql');
const serviceMongoDb = require('../services/promiseservicemongodb');
const jwt1 = require('../auth/token')
const constUserId = require('./constant')
const stripedata = require("../stripefunction/stripefunction")


function GetDataSignup(req, res) {
  promise.coroutine(function* () {
    var hash_password = yield bcrypt.hash(req.body.password, 10)
    let datamysql = {
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hash_password,
      phone_num: req.body.phone_num,
      user_id: constUserId.constant.Admin1
    }
    // console.log("----------->",datamysql);

    let resultMysql = yield servicemysql.task.signupDataMysql(datamysql);
    if (resultMysql == 0) {
      console.log("email_id already exits");
      return res.send("email_id already exits")
    }

    let token_data =
    {
      id: datamysql.email,
      key: "key1"
    }
    const token_result = yield jwt1.task.generateToken(token_data);
    let data =
    {
      access_token: token_result,
      email: datamysql.email
    }
    console.log("---------", data);

    const Save_Token = yield servicemysql.task.SaveToken(data);
    console.log(Save_Token);
    res.send("successfull signup")

  })().catch((err) => {
    console.log(err)
    res.send(err);
  });
}
function GetDataLogin(req, res) {

  promise.coroutine(function* () {
    let logindata =
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    let user = yield servicemysql.task.loginDataMysql(logindata);
    if (!user.length) {
      return res.send("user doesn't exits")
    }
    var data1 = yield bcrypt.compare(logindata.password, user[0].password);
    if (data1 == true) {
      let token =
      {
        id: logindata.email || logindata.username,
        key: "key1"
      }
      const token_result = yield jwt1.task.generateToken(token)
      let data =
      {
        access_token: token_result,
        email: logindata.email,
        username: logindata.username
      }
      // console.log("-------", data);

      const Save_Token = yield servicemysql.task.SaveToken(data);
      console.log(Save_Token);
      console.log("login successful");
      res.json({
        message: "login successfull",
        status: 200,
        token: token_result
      })
    }

    else if (data1 == false) {
      res.send("incorrect password")
      console.log("incorrect password");

    }
  })().catch((err) => {
    console.log(err);
    res.send(err);

  });
}
function ViewProfile(req, res) {
  promise.coroutine(function* () {
    var token_data = {
      token: req.body.access_token
    }
    let get_data = yield servicemysql.task.fetchData(token_data)
    if (get_data.length == 0) {
      console.log("session token expired");
      return res.send("session token expired")

    }
    else {
      console.log(get_data);
      res.send(get_data)
    }

  })().catch((err) => {
    console.log(err);
    res.send(err);

  })

}
function Logout(req, res) {
  promise.coroutine(function* () {
    var token_data = {
      token: req.body.access_token
    }
    let get_data = yield servicemysql.task.logoutDb(token_data)
    if (get_data.affectedRows > 0) {
      console.log(get_data);

      console.log("successfull logout");
      res.send("successfull logout")

    }
    else {
      console.log(get_data);
      console.log("already logout");
      res.send("already logout")

    }
  })().catch((err) => {
    console.log(err);
    res.send(err);

  })

}
function AddCard(req, res) {
  promise.coroutine(function* () {
    var data = req.body
    var access_token = yield servicemysql.task.fetchAccessToken(data);
    if (access_token.length == 0) {
      console.log("session token expired");
      return res.send("session token expired")
    }
    else {
      number = data.cardnumber
      var card_details = {
        name: data.name,
        cardnumber: (number).substr((number).length - 4),
        exp_month: data.exp_month,
        exp_year: data.exp_year,
        email: data.email
      }
      var check_card_details = yield serviceMongoDb.task.checkCardDetails(card_details)
      if (check_card_details.length != 0) {
        console.log("card already exits");
        return res.send("card already exits")
      }
      else {
        var card = {
          number: data.cardnumber,
          exp_month: data.exp_month,
          exp_year: data.exp_year,
          cvc: data.cvv
        }

        let stripe_key = yield serviceMongoDb.task.FindStripeKeys(data.email)
        console.log("----stripekey", stripe_key);

        let data_key = stripe_key[0].data;
        console.log("----stripekey", data_key);

        var card_token = yield stripedata.task.getToken({ card }, { secretkey: data_key.secretkey });
        var data1 = {
          description: data.email,
          source: card_token
        }
        console.log("---data1----", data1);

        var customerid = yield stripedata.task.createCustomer(data1, { secretkey: data_key.secretkey })

        var data2 = {
          email: data.email,
          card_token: card_token,
          customerId: customerid.id,
          cardNumber: (number).substr((number).length - 4),
          ExpMonths: data.exp_month,
          ExpYears: data.exp_year,
          Name: data.name
        }
        console.log(data2.cardNumber);
        var SaveId = yield serviceMongoDb.task.customerSaveData(data2)
        if (SaveId == false) {
          console.log("card already exits");
          return res.send("card already exits")
        }
        else {
          console.log("successfully saved");
          return res.send("successfully saved")

        }
      }
    }
  })().catch((err) => {
    console.log(err);
    res.send(err);

  })

}
function DeleteCard(req, res) {
  promise.coroutine(function* () {
    data = req.body
    var id = yield jwt1.task.authenticateToken({ access_token: data.access_token });
    if (id.length == 0) {
      console.log("session token expired");
      return res.send("session token expired")
    }
    data.email = id
    var result = yield serviceMongoDb.task.deleteCard(data)
    if (result == 1) {
      console.log("your card successfully deleted");
      res.send("your card successfully deleted")
    }

    res.send(result)


  })().catch((err) => {
    console.log(err);
    res.send(err);
  });

}
function DefaultCard(req, res) {
  promise.coroutine(function* () {
    let data = req.body
    var id = yield jwt1.task.authenticateToken({ access_token: data.access_token });
    if (id.length == 0) {
      console.log("session token expired");
      return res.send("session token expired")
    }
    data.email = id
    // console.log("-----------data",data);
    var result = yield serviceMongoDb.task.makeDefault(data)
    if (result == 1) {
      console.log("successfully card added as default");
      res.send("successfully card added as default")
    }
    else {
      console.log("token not found");
      res.send("token not found")

    }



  })().catch((err) => {
    console.log(err);
    res.send(err);
  });

}
function payment(req, res) {
  promise.coroutine(function* () {
    var data = req.body;
    var FindId = yield jwt1.task.authenticateToken({ access_token: data.access_token });
    console.log("----------",FindId);
    
    if (FindId.length == 0) {
      console.log("session token expired");
      return res.send("session token expired");
    }
    var stripekey = yield serviceMongoDb.task.FindStripeKeys(data.email)
    var datakey = stripekey[0].data;
    // console.log("------",datakey)
    var card_details = yield serviceMongoDb.task.findCardDetails(data)
    console.log("---card_details",card_details);
    
    // console.log(card_details);

    // console.log("--------hello--",card_details[0].data[0].customerId);
    // res.send(card_details)

    let data1 = {
      amount: (data.amount),
      currency: 'inr',
      customer: card_details[0].data[0].customerId,
      description: data.email,

    }
    let charge = yield stripedata.task.CreateCharge(data1, { secretkey: datakey.secretkey })
    console.log(charge);

    let save_status = yield servicemysql.task.transctionStatus(charge)
    if (charge.status == "succeeded") {
      console.log("transction successful of amount", charge.amount);
      console.log(charge);
      res.send("transaction successful of amount")
    }
    else {
      console.log("error occurred");
      res.send("error occurred")
    }
  })().catch((err) => {
    console.log(err);
    res.send(err);
  });



}
function getCard(req, res) {
  promise.coroutine(function* () {
    var verify_token = yield jwt1.task.authenticateToken({ access_token: req.body.access_token });
    if (verify_token.length > 0) {
      var card_details = yield serviceMongoDb.task.getCard(verify_token)
      console.log(JSON.stringify(card_details));
      res.send(card_details)

    }
  })().catch((err) => {
    console.log(err);
    res.send(err);
  });


}


exports.task = {
  GetDataSignup: GetDataSignup,
  GetDataLogin: GetDataLogin,
  ViewProfile: ViewProfile,
  Logout: Logout,
  AddCard: AddCard,
  DeleteCard: DeleteCard,
  DefaultCard: DefaultCard,
  payment: payment,
  getCard: getCard
}




// var FindId = yield servicemysql.task.FindCustomerId(data)
    // if (FindId.length == 0) {
    //   console.log("user doesn't exits");
    //   return res.send("user doesn't exits");

    // }

// let resultMongoDB = yield serviceMongoDb.task.SignupDataMongodb(datamongoDB);
    // if (resultMongoDB == 1) {
    //   res.send("successful signup")
    //   console.log("successful signup"); 
    // }
    // let tokendata =
    // {
    //   email: datamysql.email
    // }
    // let id = yield servicemysql.task.FindId(tokendata);