let db = require('./dbconnect')

exports.getOrders = (req, res) => {
    var conLocalPool = db.conLocalPool;
    //opening the connection pool. 
    var Response = {
        "status": "",
        "data": ""
    }
    //defining the return object 

    let token =req.query.token

    let str = `call getCustomersByid('${token}')`
    console.log(str);

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
            else
            {
                if(rows[0][0].Result=="Failure")
                {
                    Response.status = "Failure"; Response.message = "Token Failure"
                    Response.data=rows[0][0].Result
                    res.send(Response);
                }
                else{
                    Response.status = "Success"; Response.message = "Get Orders"
                    Response.data=rows
                    res.send(Response);
                }    
            }
            con.release();

        });
    });
}

exports.bookOrder = (req,res)=>{
    var conLocalPool = db.conLocalPool;
    //opening the connection pool. 
    var Response={
        "status":"", 
        "data":""
    }
    let token =req.body.token
    let providerid =req.body.providerid
    let providertype =req.body.providertype
    let amount =req.body.amount
    let servicetime =req.body.servicetime
    let duration =req.body.duration

    let str = `call bookOrder('${token}','${providerid}','${providertype}','${amount}'
    ,'${servicetime}','${duration}')`
    console.log(str);
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
                    if(rows[0][0].Result=="Failure")
                    {
                        Response.status = "Failure"; Response.message = "Token Failure"
                        Response.data=rows[0][0].Result
                        res.send(Response);
                    }
                    else{
                        Response.status = "Success"; Response.message = "Ordered successfully"
                        Response.data=rows[0][0].Result
                        res.send(Response);
                    }    
                }
                con.release();
            });
        });
}
