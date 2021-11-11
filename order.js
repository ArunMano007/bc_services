let db = require('./dbconnect')

exports.getOrders = (req, res) => {
    var conLocalPool = db.conLocalPool;
    //opening the connection pool. 
    var Response = {
        "status": "",
        "data": ""
    }
    //defining the return object 


    let str = `Select * from orders where isactive = 1`

    conLocalPool.getConnection(function (err, con) {
        if (err) {
            if (con)
                con.release();
            Response.status = "ERR"; Response.data = "Connection Error"
            res.send(Response);
            return;
        }
        con.query(str, function (err, rows, fields) {
            if (err) {
                Response.status = "ERR"; Response.data = "Query Error"
                res.send(Response);
            }
            else {

                Response.status = "Success"; Response.data = rows
                res.send(Response);
            }
            con.release();

        });
    });
}
