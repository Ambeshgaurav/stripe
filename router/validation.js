var joi = require("joi")


function validateData(req, res, next) {
    let data=req.body
    const schema = joi.object().keys({
        client_address: joi.string().required(),
        fulfill_at: joi.string().required(),
        "restaurant_country": joi.required(),
        "restaurant_city": joi.required(),
        "restaurant_state": joi.required(),
        "restaurant_zipcode": joi.required(),
        "restaurant_street": joi.required()
    });

    let schema1 = joi.object().keys({
        orders : joi.array().items(joi.object().keys({
            client_address: joi.string().required(),
            fulfill_at: joi.string().required(),
            "restaurant_country": joi.required(),
            "restaurant_city": joi.required(),
            "restaurant_state": joi.required(),
            "restaurant_zipcode": joi.required(),
            "restaurant_street": joi.required()
        }).required()).required(),
        count:joi.any().optional()
    })
    // let data1={
    //     client_address:data.orders[0].client_address,
    //     fulfill_at: data.orders[0].fulfill_at,
    //     "restaurant_country": data.orders[0].restaurant_country, 
    //     "restaurant_city": data.orders[0].restaurant_city,
    //     "restaurant_state":  data.orders[0].restaurant_state,
    //     "restaurant_zipcode":data.orders[0].restaurant_zipcode,
    //     "restaurant_street": data.orders[0].restaurant_street 

    // }
    joi.validate(data, schema1, (err, result) => {
        if (err) {
            console.log(err.message);
            res.send(err.message)
        }
        else {
            next();
        }
    })
}

module.exports = {
    validateData:validateData

}