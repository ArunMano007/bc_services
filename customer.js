let db = require('./dbconnect')

exports.loginCustomer = (req,res)=>{
    var conLocalPool = db.conLocalPool;
    
    let phone = req.body.phone;
    let password = req.body.password;

    let Response = {
        "status": "", "message": "", data: ""
    }

    let str = `call CustomerLogin('${phone}','${password}')`
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
                if(rows[0][0].result=="Failure")
                {
                    Response.status = "Failure"; Response.message = "Invalid Credentials"
                    Response.data=rows[0][0].Result
                    res.send(Response);
                }
                else{
                    Response.status = "Success"; Response.message = "Login Successfully"
                    Response.data=rows[0][0].Result
                    res.send(Response);
                }

            }
            con.release();

        });
    });

}
exports.registerCustomer = (req,res)=>{
    var conLocalPool = db.conLocalPool;
    //opening the connection pool. 
    var Response={
        "status":"", 
        "data":""
    }
    //defining the return object 
    var username = req.body.username;
    var mobile = req.body.mobile;
    var password = req.body.password;  
    var address = req.body.address; 
    var location = req.body.location; 
    

    let str = `call registerCustomer('${username}','${mobile}','${password}','${address}','${location}')`

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
                    if (rows[0][0].result == "Failure") {
                      Response.status = "Failure";
                      Response.message = "Account Already exists";
                      Response.data = rows[0][0].Result;
                      res.send(Response);
                    } else {
                      Response.status = "Success";
                      Response.message = "Registered Successfully";
                      Response.data = rows[0][0].Result;
                      res.send(Response);
                    }
                  }
                con.release();
    
            });
        });
}

exports.getCustomers = (req,res)=>{
    var conLocalPool = db.conLocalPool;
    //opening the connection pool. 
    var Response={
        "status":"", 
        "data":""
    }
    //defining the return object 
    let str = `Select * from customers where isactive = 1`

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

exports.getCustomersByid = (req,res)=>{
    var conLocalPool = db.conLocalPool;
    //opening the connection pool. 
    var Response={
        "status":"", 
        "data":""
    }
    let token =req.body.token

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
                else {
                    if(rows[0][0].Result=="Failure")
                    {
                        Response.status = "Failure"; Response.message = "Token Failure"
                        Response.data=rows[0][0].Result
                        res.send(Response);
                    }
                    else{
                        Response.status = "Success"; Response.message = "Get Customer"
                        Response.data=rows
                        res.send(Response);
                    }    
                }
                con.release();
            });
        });
}

exports.UpdateCustomerProfile = (req,res)=>{
    var conLocalPool = db.conLocalPool;
    //opening the connection pool. 
    var Response={
        "status":"", 
        "data":""
    }
    //defining the return object 
    var token = req.body.token;
    var username = req.body.username;
    var mobile = req.body.mobile;
    var photo = req.body.photo;  
    var address = req.body.address; 
    var location = req.body.location; 
    

    let str = `call UpdateCustomerProfile('${token}','${username}','${mobile}','${photo}','${address}','${location}')`

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
                        Response.status = "Success"; Response.message = "Customer Updated Successfully"
                        Response.data=rows
                        res.send(Response);
                    }    
                }
                con.release();
    
            });
        });
}


