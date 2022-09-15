const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: 'password',
    user: 'root',
    database: 'nusmoney',
    host: 'localhost',
    port: '3306'
});

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