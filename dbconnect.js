var mysql = require('mysql');

var config = {
  host: "database-1.ckhrxfdw45as.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "Faith123#*",
  // After Create table
  database: "trenzer",
  connectionLimit :20, 
 
};

var conLocalPool = mysql.createPool(config);
exports.conLocalPool = conLocalPool;
