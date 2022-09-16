const mysql = require('mysql');
require('dotenv').config();

// setup database connection    
var properties = {
    connectionLimit: 10,
    password: process.env.DBPASSWD,
    user: process.env.DBUSER,
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    port: process.env.DBPORT
};

const pool = mysql.createPool(properties);

let nusmoneydb = {};

nusmoneydb.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}
module.exports = nusmoneydb;