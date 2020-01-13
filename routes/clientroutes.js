const router = require("express").Router();
const promisecontroller = require('../controller/promisecontroller')
const SaveKey = require('../stripefunction/AddStripeKey')
// const validate=require('./validation');





router.post('/signup', promisecontroller.task.GetDataSignup);
router.post('/login', promisecontroller.task.GetDataLogin);
router.post('/viewProfile', promisecontroller.task.ViewProfile);
router.post('/logout', promisecontroller.task.Logout);
router.post("/AddKey", SaveKey.task.AddStripeKey);
router.post("/AddCard", promisecontroller.task.AddCard);
router.post("/makepayment", promisecontroller.task.payment);
router.post("/deletecard", promisecontroller.task.DeleteCard);
router.post("/defaultcard", promisecontroller.task.DefaultCard);
router.post("/getcard", promisecontroller.task.getCard);
//  router.post("/token",stripecontroller.task.TokenCreate);













module.exports = router;