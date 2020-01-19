const connect = require('../configservices/confimongo')


function saveData(req_data,res_data) {
    // console.log(data);

    return new Promise((resolve, reject) => {

        connect.dbo.collection('client').insert({req_data,res_data }, (err, res) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(res.insertedCount);

            }
        });

    });

}
module.exports={
    saveData:saveData

}