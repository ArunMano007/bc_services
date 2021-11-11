let db = require('./dbconnect')

exports.saveProvider = (req, res) => {
    let functionname = "saveProvider"

    var conLocalPool = db.conLocalPool;
    let Response = {
        "status": "", "message": "", data: ""
    }
    let nm = req.body.name
    let ad = req.body.address
    let service = req.body.service
    let hourlyrate = req.body.hourlyrate

    let str = `insert into provider (username,address,service, hourlyrate) 
    values ('${nm}','${ad}','${service}',${hourlyrate})`

    console.log(str)
    conLocalPool.getConnection(function (err, con) {
        if (err) {
            if (con)
                con.release();
            Response.status = "ERR"; Response.message = "Connection Error"
            res.send(Response);
            return;
        }
        con.query(str, function (err, rows, fields) {
            if (err) {
                Response.status = "ERR"; Response.message = "Query Error"
                res.send(Response);
            }
            else {

                Response.status = "Success"; Response.message = "Inserted Successfully"
                res.send(Response);
            }
            con.release();

        });
    });
}


exports.listProviders = (req, res) => {
    var conLocalPool = db.conLocalPool;
    let Response = {
        "status": "", "message": "", data: ""
    }

    let str = `Select * from provider where isactive =1`

    console.log(str)
    conLocalPool.getConnection(function (err, con) {
        if (err) {
            if (con)
                con.release();
            Response.status = "ERR"; Response.message = "Connection Error"
            res.send(Response);
            return;
        }
        con.query(str, function (err, rows, fields) {
            if (err) {
                Response.status = "ERR"; Response.message = "Query Error"
                res.send(Response);
            }
            else {

                Response.status = "Success"; Response.message = "Listed Successfully";
                Response.data = rows
                res.send(Response);
            }
            con.release();

        });
    });
}
exports.listOrders = (req, res) => {
    var conLocalPool = db.conLocalPool;
    let Response = {
        "status": "", "message": "", data: ""
    }

    let str = `select * from orders o join provider p on p.providerid=o.providerid join customers c on c.customerid = o.customerid `

    console.log(str)
    conLocalPool.getConnection(function (err, con) {
        if (err) {
            if (con)
                con.release();
            Response.status = "ERR"; Response.message = "Connection Error"
            res.send(Response);
            return;
        }
        con.query(str, function (err, rows, fields) {
            if (err) {
                Response.status = "ERR"; Response.message = "Query Error"
                res.send(Response);
            }
            else {

                Response.status = "Success"; Response.message = "Listed Successfully";
                Response.data = rows
                res.send(Response);
            }
            con.release();

        });
    });
}


