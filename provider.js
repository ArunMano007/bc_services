let db = require("./dbconnect");

exports.loginProvider = (req, res) => {
  var conLocalPool = db.conLocalPool;

  let mobile = req.body.mobile;
  let password = req.body.password;

  let Response = {
    status: "",
    message: "",
    data: "",
  };

  let str = `call providerLogin('${mobile}','${password}')`;
  conLocalPool.getConnection(function (err, con) {
    if (err) {
      if (con) con.release();
      Response.status = "ERR";
      Response.message = "Connection Error";
      res.send(Response);
      return;
    }
    con.query(str, function (err, rows, fields) {
      if (err) {
        Response.status = "ERR";
        Response.message = "Query Error";
        res.send(Response);
      } else {
        if (rows[0][0].Result == "Failure") {
          Response.status = "Failure";
          Response.message = "Invalid Credentials";
          Response.data = rows[0][0].Result;
          res.send(Response);
        } else {
          Response.status = "Success";
          Response.message = "Login Successfully";
          Response.data = rows[0][0].Result;
          res.send(Response);
        }
      }
      con.release();
    });
  });
};

exports.registerProvider = (req,res)=>{
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
  var service = req.body.service; 
  

  let str = `call registerProvider('${username}','${mobile}','${password}','${address}','${service}')`

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
                if (rows[0][0].Result == "Failure") {
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

exports.listProviders = (req, res) => {
  var conLocalPool = db.conLocalPool;
  let Response = {
    status: "",
    message: "",
    data: "",
  };

  let str = `Select * from provider where isactive =1`;

  console.log(str);
  conLocalPool.getConnection(function (err, con) {
    if (err) {
      if (con) con.release();
      Response.status = "ERR";
      Response.message = "Connection Error";
      res.send(Response);
      return;
    }
    con.query(str, function (err, rows, fields) {
      if (err) {
        Response.status = "ERR";
        Response.message = "Query Error";
        res.send(Response);
      } else {
        if (rows[0][0].Result == "Failure") {
          Response.status = "Failure";
          Response.message = "Invalid Credentials";
          Response.data = rows[0][0].Result;
          res.send(Response);
        } else {
          Response.status = "Success";
          Response.message = "Listed Successfully";
          Response.data = rows;
          res.send(Response);
        }
      }
      con.release();
    });
  });
};

exports.getMyProfile = (req, res) => {
  var conLocalPool = db.conLocalPool;

  let token = req.body.token;

  let Response = {
    status: "",
    message: "",
    data: "",
  };

  let str = `call viewProfile('${token}')`;
  conLocalPool.getConnection(function (err, con) {
    if (err) {
      if (con) con.release();
      Response.status = "ERR";
      Response.message = "Connection Error";
      res.send(Response);
      return;
    }
    con.query(str, function (err, rows, fields) {
      if (err) {
        Response.status = "ERR";
        Response.message = "Query Error";
        res.send(Response);
      } else {
        if (rows[0].length == 1) {
          Response.status = "Success";
          Response.message = "Fetch Successfully";
          Response.data = rows[0][0];
          let photo = JSON.parse(rows[0][0].photo);

          Response.data.photo = photo[0].image;

          res.send(Response);
        } else {
          Response.status = "Failure";
          Response.message = "Invalid Token";

          res.send(Response);
        }
      }
      con.release();
    });
  });
};
//List orders with token id
exports.orderList = (req, res) => {
  var conLocalPool = db.conLocalPool;

  let token = req.body.token;

  let Response = {
    status: "",
    message: "",
    data: "",
  };

  let str = `call orderList('${token}')`;
  conLocalPool.getConnection(function (err, con) {
    if (err) {
      if (con) con.release();
      Response.status = "ERR";
      Response.message = "Connection Error";
      res.send(Response);
      return;
    }
    con.query(str, function (err, rows, fields) {
      if (err) {
        Response.status = "ERR";
        Response.message = "Query Error";
        res.send(Response);
      } else {
        if (rows[0].length == 1) {
          Response.status = "Success";
          Response.message = "Fetch Successfully";
          Response.data = rows[0][0];
          let photo = JSON.parse(rows[0][0].photo);

          Response.data.photo = photo[0].image;

          res.send(Response);
        } else {
          Response.status = "Failure";
          Response.message = "Invalid Token";

          res.send(Response);
        }
      }
      con.release();
    });
  });
};
