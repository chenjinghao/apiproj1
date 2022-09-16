const mysql = require('mysql');
require('dotenv').config();

// setup database connection    
var properties = {
  // connectionLimit: 10,
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
});

module.exports = { mysqlConnection };



// ********Nithin's Testing********
// 'use strict';
// require('dotenv').config();
// var colors = require('colors');
// var mysql = require('mysql');
// var q = require('q');
// var MySQLConnection = {};

// MySQLConnection.connect = function () {
//   //     var d = q.defer();
//   //     MySQLConnection.connection = mysql.createConnection({
//   password: process.env.DBPASSWD,
//     user: process.env.DBUSER,
//       database: process.env.DBNAME,
//         host: process.env.DBHOST,
//           port: process.env.DBPORT
//   //     });

//   MySQLConnection.connection.connect(function (err) {
//     if (err) {
//       console.log('Not connected '.red, err.toString().red, ' RETRYING...'.blue);
//       d.reject();
//     } else {
//       console.log('Connected to Mysql. Exporting..'.blue);
//       d.resolve(MySQLConnection.connection);
//     }
//   });
//   return d.promise;
// };

// module.exports = MySQLConnection;