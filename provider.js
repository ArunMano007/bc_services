let db = require('./dbconnect')

exports.loginProvider = (req,res)=>{
var conLocalPool = db.conLocalPool; 

    let mobile = req.body.mobile; 
    let password = req.body.password; 
    
    let Response = {
        "status": "", "message": "", data: ""
    }

    let str = `call providerLogin('${mobile}','${password}')`
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
                if(rows[0][0].Result=="Failure")
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

exports.getMyProfile = (req,res)=>{
    var conLocalPool = db.conLocalPool; 
    
        let token = req.body.token; 
        
        
        let Response = {
            "status": "", "message": "", data: ""
        }
    
        let str = `call viewProfile('${token}')`
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
                    if(rows[0].length ==1){
                        Response.status = "Success"; Response.message = "Fetch Successfully"
                        Response.data=rows[0][0]
                        let photo = JSON.parse( rows[0][0].photo)

                        Response.data.photo =photo[0].image;


                        res.send(Response);   
                    }else{
                        Response.status = "Failure"; Response.message = "Invalid Token"
                      
                        res.send(Response);
                    }

                    
    
                }
                con.release();
    
            });
        });
    }
