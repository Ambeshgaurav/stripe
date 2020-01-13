const connectMysql = require('../config/configmysql');

function signupDataMysql(data) {

    return new Promise((resolve, reject) => {
        connectMysql.service.connection.query("select email from customer2 where email=?", [data.email], function (err, rows) {
            if (err) {
                reject(err)
            }
            else if (rows && rows.length) {
                // console.log(rows);
                resolve(0)
            }
            else {
                var sql = ("insert into customer2 (userId,name,email,password,phone_number,userName) values(?,?,?,?,?,?)");
                connectMysql.service.connection.query(sql, [data.user_id, data.name, data.email, data.password, data.phone_num, data.username], function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(rows)
                    }

                });
            }


        });

    });

}

function loginDataMysql(data) {
    return new Promise((resolve, reject) => {
        connectMysql.service.connection.query("select email ,password from customer2 where email=? OR userName=?", [data.email, data.username], function (err, rows) {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        });
    });
}
function SaveToken(data) {
    return new Promise((resolve, reject) => {
        var sql = (`update customer2 set access_token =? where email=? OR userName=?`);
        connectMysql.service.connection.query(sql, [data.access_token, data.email, data.username], function (err, rows) {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        });
    });
}
function fetchData(data) {

    return new Promise((resolve, reject) => {
        var sql = ("select name,email,userId,phone_number from customer2 where access_token=?");
        connectMysql.service.connection.query(sql, [data.token], function (err, rows) {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        });
    });

}
function logoutDb(data) {
    return new Promise((resolve, reject) => {
        var sql = ("update Customer2 set access_token=? where access_token=?");
        connectMysql.service.connection.query(sql, ["NULL", data.token], function (err, rows) {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        });
    });

}
function fetchAccessToken(data) {

    return new Promise((resolve, reject) => {
        var sql = ("select access_token,email from customer2  where access_token=? and email=?");
        connectMysql.service.connection.query(sql, [data.access_token, data.email], function (err, rows) {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        });
    });

}
function DeleteCardDb(data) {
    console.log(data);

    return new Promise((resolve, reject) => {
        var sql = ("select email,CardNumber,ExpMonths,ExpYear,isdefault from customer2 where email=? and CardNumber=? and ExpMonths=? and ExpYear=?")
        connectMysql.service.connection.query(sql, [data.email, data.number, data.exp_month, data.exp_year], function (err, rows) {
            if (rows.length == 0) {
                resolve("card doesn't exits")
            }
            else if (rows.length != 0) {
                if (rows[0].isdefault == "true") {
                    console.log("first-----", rows);

                    var sql = ("select  email,isdefault,CardNumber,ExpMonths,ExpYear,isdefault from customer2 where email=? and isdefault=?")
                    connectMysql.service.connection.query(sql, [data.email, "false"], function (err, results) {
                        if (!err) {
                            console.log(results);

                            var sql = ("update customer2 set isdefault=? where email=? and CardNumber=?")
                            connectMysql.service.connection.query(sql, ["true", results[0].email, results[0].CardNumber], function (err, rows) {
                                if (!err) {
                                    console.log(rows);

                                    var sql = ("update customer2 set DeleteCard=? where email=? and CardNumber=? and ExpMonths=? and ExpYear=? ")
                                    connectMysql.service.connection.query(sql, [1, data.email, data.number, data.exp_month, data.exp_year], function (err, rows) {
                                        if (err) {
                                            reject(err)
                                        }
                                        else {
                                            console.log("-------", rows);
                                            resolve(rows)
                                        }

                                    })
                                }

                            })

                        }

                    })
                }



            }

        });
    })
}
function FindCustomerId(data) {
    return new Promise((resolve, reject) => {
        var sql = ("select customerid,email from customer2 where email=? and isdefault=? and DeleteCard=?")
        connectMysql.service.connection.query(sql, [data.email, "true", 0], function (err, rows) {
            if (err) {
                reject(err)
            }
            else {
                console.log(rows);
                resolve(rows)
            }
        });
    })

}
function CustomerSaveId(data) {
    var isdefault = false;
    return new Promise((resolve, reject) => {
        var sql = ("select CardNumber from customer2 where email=?")
        connectMysql.service.connection.query(sql, [data.email], function (err, rows) {
            if (rows.length && rows[0].CardNumber == '') {
                var isdefault = "true";
            }
            if (!err) {
                var sql = ("update  customer2 set CustomerId=?,cardtoken=?,isdefault=?,DeleteCard=?,CardNumber=?,ExpMonths=?,ExpYear=? where email=?")
                connectMysql.service.connection.query(sql, [data.customerId, data.token, isdefault, 0, data.cardNumber, data.ExpMonths, data.ExpYears, data.email], function (err, rows) {
                    // console.log("third-------",rows);

                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(rows)
                    }
                });
            }


        })
    })

}
function DefaultCardDb(data) {
    console.log(data);

    return new Promise((resolve, reject) => {
        var sql = ("select email,CardNumber,ExpMonths,ExpYear from customer2 where email=? and CardNumber=? and ExpMonths=? and ExpYear=?")
        connectMysql.service.connection.query(sql, [data.email, data.number, data.exp_month, data.exp_year], function (err, rows) {
            if (rows.length == 0) {
                resolve("card doesn't exits")
            }
            else if (rows.length != 0) {
                var sql = ("update customer2 set isdefault=? where email=?")
                connectMysql.service.connection.query(sql, ["false", data.email], function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    else {
                        var sql = ("update customer2 set isdefault=? where email=?and CardNumber=? and ExpMonths=? and ExpYear=?")
                        connectMysql.service.connection.query(sql, ["true", data.email, data.number, data.exp_month, data.exp_year], function (err, rows) {
                            if (err) {
                                reject(err)
                            }
                            else {
                                resolve(rows)
                            }
                        })

                    }

                })

            }
            else {
                reject(err)
            }
        });
    })

}
function CheckCardDetails(data) {
    return new Promise((resolve, reject) => {
        var sql = ("select email,CardNumber,ExpMonths,ExpYear from customer2 where email=? and CardNumber=?and ExpMonths=? and ExpYear=?")
        connectMysql.service.connection.query(sql, [data.email, data.cardnumber, data.exp_month, data.exp_year], function (err, rows) {
            if (err) {
                reject(err)
            }
            else {
                console.log(rows);
                resolve(rows)
            }
        });
    })

}
function transctionStatus(data) {
    return new Promise((resolve, reject) => {
        var sql = (`insert into customer2 (email,CustomerId,CardNumber,Status,amount) values(?,?,?,?,?)`);
        connectMysql.service.connection.query(sql, [data.description, data.customer, data.source.last4,data.status,data.amount], function (err, rows) {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        });
    });

}
function getCardDetails(data) {
    return new Promise((resolve, reject) => {
        var sql = (`select email from customer2 where access_token=?`);
        connectMysql.service.connection.query(sql, [data], function (err, rows) {
            if (err) {
                reject(err)
            }
            else if(rows.length!=0)
            {
                var sql = (`select CardNumber,ExpMonths,ExpYear from customer2 where email=?`);
                connectMysql.service.connection.query(sql, [rows[0].email], function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(rows)
                    }
                })

            }
        });
    })

}
// function fetchData(data)
// {
//     return new Promise((resolve, reject) => {
//         var sql = ("select CustomerId from customer2 where access_token=?")
//         connectMysql.service.connection.query(sql, [data.access_token], function (err, rows) {
//             if (err) {
//                 reject(err)
//             }
//             else {
//                 console.log(rows);
//                 resolve(rows)
//             }
//         });
//     })

// }


exports.task =
{
    signupDataMysql: signupDataMysql,
    loginDataMysql: loginDataMysql,
    SaveToken: SaveToken,
    fetchData: fetchData,
    logoutDb: logoutDb,
    fetchAccessToken: fetchAccessToken,
    DeleteCardDb: DeleteCardDb,
    FindCustomerId: FindCustomerId,
    CustomerSaveId: CustomerSaveId,
    DefaultCardDb: DefaultCardDb,
    CheckCardDetails: CheckCardDetails,
    transctionStatus: transctionStatus,
    getCardDetails: getCardDetails
    // fetchData:fetchData
    // FindId: FindId
}



// function FindId(data) {
//     return new Promise((resolve, reject) => {
//         connectMysql.service.connection.query("select userId from Customer2 where email=?", [data.email], function (err, rows) {
//             if (err) {
//                 reject(err);
//             }
//             else {
//                 resolve(rows)
//             }

//         });


//     });

// }
