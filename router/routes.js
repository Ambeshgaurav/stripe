const customer_controller=require('../controller/customerController');
const router=require("express").Router();
const validation=require('./validation')

router.post('/createTask',customer_controller.createTask)
// router.post('/addAgent',customer_controller.addAgent)
// router.post('/getAllAgents',customer_controller.getAgent)
// router.post('/blockAndUnblock',customer_controller.blockAndUnblock)



module.exports=router



