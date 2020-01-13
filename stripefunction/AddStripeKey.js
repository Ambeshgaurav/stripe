const MongoService = require('../services/promiseservicemongodb')
const promise = require("bluebird");
const express=require("express");
const app=express();
app.use(express.json());

function AddStripeKey(req, res) {
    var data = {
        email:req.body.email,
        publickey: req.body.publicKey,
        secretkey: req.body.secretKey
    }
    console.log('heloo-----------------',data);
    
    promise.coroutine(function* () {
        var SaveStripe = yield MongoService.task.SaveStripeKeys(data);
        if (SaveStripe == 1) {
            console.log("stripe key added sucessfully");
            return res.send("stripe key added sucessfully")
        }
    })().catch((err) => {
        console.log(err);
        res.send(err);
    });


}


exports.task = {
    AddStripeKey: AddStripeKey

}