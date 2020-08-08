const mysql = require('mysql'),
    sqlInfo = mysql.createConnection({
        user: "root",
        password: "abc123456",
        database: "dbs",
    });

module.exports = sqlInfo;