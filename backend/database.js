const mysql = require('mysql');
require('dotenv').config();
// var q = require('q');
// var d = q.defer();

// setup database connection    
var properties = {
  connectionLimit: 10,
  password: process.env.DBPASSWD,
  user: process.env.DBUSER,
  database: process.env.DBNAME,
  host: process.env.DBHOST,
  port: process.env.DBPORT
};

var mysqlConnection = mysql.createConnection(properties);

mysqlConnection.connect((errors) => {
  if (errors) console.log("Error occurred while connecting to MySQL server");
  else console.log("Connected to MySQL successfully!");
  // if (errors) {console.log('Not connected '.red, errors.toString().red, ' RETRYING...'.blue);
  // d.reject();}
  // else {console.log('Connected to Mysql. Exporting..'.blue);
  // d.resolve(mysqlConnection);}
  // return d.promise;
});

module.exports = { mysqlConnection };



// ********Nithin's Testing********
// 'use strict';
// require('dotenv').config();
// var mysql = require('mysql');
// var q = require('q');
// var mysqlConnection = {};

// var properties = {
//   password: process.env.DBPASSWD,
//   user: process.env.DBUSER,
//   database: process.env.DBNAME,
//   host: process.env.DBHOST,
//   port: process.env.DBPORT
// };

// mysqlConnection.connect = function () {
//   var d = q.defer();
//   mysqlConnection.connection = mysql.createConnection(properties);

//   mysqlConnection.connection.connect((errors) => {
//     if (errors){ console.log('Not connected '.red, errors.toString().red, ' RETRYING...'.blue); d.reject();}
//     else {console.log('Connected to Mysql. Exporting..'.blue);
//       d.resolve(mysqlConnection.connection);
//     }});
//   return d.promise;
// };

// module.exports = mysqlConnection;