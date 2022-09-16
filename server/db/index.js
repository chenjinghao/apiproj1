const mysql = require('mysql');

// setup database connection    
const pool = mysql.createPool({
    connectionLimit: 10,
    password: 'fintechsg',
    user: 'root',
    database: 'Project9C',
    host: '34.87.190.25',
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