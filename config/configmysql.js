var mysql = require('mysql');
 connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'student'
});
connection.connect(function (err, result) {
    if (err) 
        console.log("error occurred while connection in DB");
    else
    {
        console.log("connected..."); 
        // console.log(result);
    }
        
    });
    exports.service={
        connection:connection

    }