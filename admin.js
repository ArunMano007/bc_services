let db = require('./dbconnect')

exports.loginAdmin = (req,res)=>{
    var functionname = "loginadmin"
    var conLocalPool = db.conLocalPool;
    //opening the connection pool. 
    var data = { "Response": "" };

    //defining the return object 
    var name = req.body.username; 
    var password = req.body.password;  

    var str = '';
    str = "call " + functionname + "('" + name + "','" + password + "')";

    console.log(str);
    conLocalPool.getConnection(function (err, con) {
        if (err) {
            if (con)
                con.release();
            console.log('Error while performing Query.(gps_save_pool) '+functionname + err);
            res.send({ error: "Error while performing Query.(gps_save_con) " + functionname + err });
            return;
        }
        con.query(str, function (err, rows, fields) {
            if (err) {
                console.log('Error while performing Query.(gps_save_con) '+functionname + err);
                res.send({ error: "Error while performing Query.(gps_save_con) " + functionname + err });
            }
            else {
                data["Response"] = rows;
                res.send(data);
            }
            con.release();
        });
    });
}

exports.getAdminDashboard = (req,res)=>{
    var functionname = "getAdminDashboard"
    var conLocalPool = db.conLocalPool;
    //opening the connection pool. 
    var data = { "Response": "" };

    //defining the return object 
    var token = req.query.token;  

    var str = '';
    str = "call " + functionname + "('" + token + "')";

    console.log(str);
    conLocalPool.getConnection(function (err, con) {
        if (err) {
            if (con)
                con.release();
            console.log('Error while performing Query.(gps_save_pool) '+functionname + err);
            res.send({ error: "Error while performing Query.(gps_save_con) " + functionname + err });
            return;
        }
        con.query(str, function (err, rows, fields) {
            if (err) {
                console.log('Error while performing Query.(gps_save_con) '+functionname + err);
                res.send({ error: "Error while performing Query.(gps_save_con) " + functionname + err });
            }
            else {
                data["Response"] = rows;
                res.send(data);
            }
            con.release();
        });
    });
}