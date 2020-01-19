const customer_controller=require('../controller/clientController');
const router=require("express").Router();
// const validation=require('./validation')

router.post('/createTask',customer_controller.createTask)




module.exports=router