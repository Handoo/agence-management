const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: '',
    database: 'agence_db'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
