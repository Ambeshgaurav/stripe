var joi=require("joi")


function SignupValidator(req,res,next)
{
    const schema=joi.object().keys({
        name:joi.string().min(4).max(100).required(),
        email:joi.string().required().email().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        password:joi.string().min(5).max(20).required(),
        phone_num:joi.string().min(10).max(10).regex(/^[6-9][0-9]{9}$/).required(),
        address:joi.string().min(20).max(100).required(),
        job_type:joi.string().min(4).max(100).required(),
        age:joi.string().min(1).max(3).required()
    });

      joi.validate(req.body,schema,(err,result)=>
   {
       if(err)
       {
           console.log(err);
            res.send(err.message);
       }
       else
       {
        next();
       }
         
   }) 
}

function loginValidator(req,res,next)
{
    const schema=joi.object().keys({
        email:joi.string().required().email().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        password:joi.string().min(5).max(100).required()
    });
   joi.validate(req.body,schema,(err,result)=>
   {
       if(err)
       {
          console.log(err.message);   
          res.send(err.message)
       }
       else
       {
        next();
       }
         
   })
};
exports.task={
    loginValidator:loginValidator,
    SignupValidator:SignupValidator 
}