const connect = require('../config/configmongodb')


function SaveStripeKeys(data) {
    // console.log(data);

    return new Promise((resolve, reject) => {

        connect.dbo.collection('Customer2').insertOne({ data }, (err, res) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(res.insertedCount);

            }
        });

    });

}
function FindStripeKeys(data) {
    return new Promise((resolve, reject) => {
        connect.dbo.collection('Customer2').find({ email: data.email }).toArray((err, res) => {
            if (err) {
                reject(err)
            }
            else {
                // console.log("-----res", res);
                resolve(res);
            }
        });
    })

}
function checkCardDetails(data) {
    return new Promise((resolve, reject) => {
        connect.dbo.collection('Customer2').find({
            email: data.email, data: {
                $elemMatch: {
                    cardNumber: data.cardnumber,
                    ExpMonths: data.exp_month,
                    ExpYears: data.exp_year
                }
            }
        }).toArray((err, res) => {
            if (err) {
                reject(err)
            }
            else {
                console.log("-----res", res);
                resolve(res);
            }
        });


    })

}
function customerSaveData(data) {
    return new Promise((resolve, reject) => {
        var isdefault = false;
        var delete_card = 0

        connect.dbo.collection('Customer2').find({ email: data.email }, { 'email': 1 }).toArray((err, res) => {
            data.isdefault = isdefault
            data.delete_card = delete_card
            let data_to_save = {
                email: data.email,
            }
            if (res.length != 0) {
                // delete data.email
                data_to_save = data
                connect.dbo.collection('Customer2').update({ email: data.email }, { $push: { data: data_to_save } }, (err, res) => {
                    if (err) {
                        console.log(err);
                        reject(err)
                    }
                    else {
                        console.log("this ------->", res);

                        resolve(res.insertedCount);

                    }
                });
            }
            else if (res.length == 0) {
                delete data.email
                data_to_save.data = [data]
                data_to_save.data[0].isdefault = "true";
                console.log(data_to_save);

                connect.dbo.collection('Customer2').insert(data_to_save, (err, res) => {
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                    else {
                        console.log("this ------->", res);

                        resolve(res.insertedCount);

                    }
                });

            }
        });


    })

}
function getCard(data) {
    return new Promise((resolve, reject) => {
        connect.dbo.collection('Customer2').find({ email: data }).toArray((err, res) => {
            if (err) {
                reject(err)
            }
            else {
                // console.log("-----res", JSON.stringify(res));
                resolve(JSON.stringify(res));
            }
        });


    })

}
function findCardDetails(data) {
    console.log(data);

    return new Promise((resolve, reject) => {
        connect.dbo.collection('Customer2').find({
            email: data.email, data: {
                $elemMatch: {
                    isdefault: true,
                    delete_card:0

                }
            }
        }).toArray((err, res) => {
            if (err) {
                reject(err)
            }
            else {
                // console.log("-----res", res);
                resolve(res);
            }
        });


    })

}
function makeDefault(data) {
    return new Promise((resolve, reject) => {
        connect.dbo.collection('Customer2').updateMany({
            email: data.email,
        },
            { $set: { "data.$[].isdefault": false } }, (err, res) => {
                console.log(err, res);

                if (!err) {
                    connect.dbo.collection('Customer2').updateOne({
                        email: data.email,
                        data: {
                            $elemMatch:
                                { card_token: data.card_token }
                        }
                    },
                        { $set: { "data.$.isdefault": true } }, (err, res) => {
                            if (err) {
                                reject(err)
                            }
                            else {
                                // console.log("-----------", res);

                                resolve(res.modifiedCount)
                            }
                        })
                }

            })

    })
}

function deleteCard(data) {
    console.log(data.card_token);

    return new Promise((resolve, reject) => {
        connect.dbo.collection('Customer2').find({
            email: data.email, data: {
                $elemMatch: { card_token: data.card_token }
            }
        }, { fields: { 'data.$': 1 } }).toArray((err, res) => {
            if (!err && res[0].data[0].isdefault == false) {
                connect.dbo.collection('Customer2').updateOne({
                    email: data.email,
                    data: {
                        $elemMatch:
                            { card_token: data.card_token }
                    }
                },
                    { $set: { "data.$.delete_card": 1 } }, (err, res) => {
                        if (!err) {
                            resolve(res.modifiedCount)
                        }

                    })
            }
            else if (!err && res[0].data[0].isdefault == true) {
                connect.dbo.collection('Customer2').updateOne({
                    email: data.email,
                    data: {
                        $elemMatch:
                            { card_token: data.card_token }
                    }
                },
                    { $set: { "data.$.delete_card": 1 } }, (err, res) => {
                       if(!err)
                       {
                        connect.dbo.collection('Customer2').updateOne({
                            email: data.email,
                            data: {
                                $elemMatch:
                                    { delete_card: 0 }
                            }
                        },
                            { $set: { "data.$.isdefault": true } }, (err, res) => {
                                if (!err) {
                                    console.log("-------final",res.modifiedCount);
                                    
                                    resolve(res.modifiedCount)
                                }
        
                            })
                       }

                    })




            }


        });


    })
}
exports.task = {
    FindStripeKeys: FindStripeKeys,
    SaveStripeKeys: SaveStripeKeys,
    checkCardDetails: checkCardDetails,
    customerSaveData: customerSaveData,
    getCard: getCard,
    findCardDetails: findCardDetails,
    makeDefault: makeDefault,
    deleteCard: deleteCard


}

// { email: data.email, "data.card_token": data.card_token }, {
//     $set: { "data.$.isdefault": "true" }
