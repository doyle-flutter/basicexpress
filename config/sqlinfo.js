const mysql = require('mysql')
    sqlConn = {},
    sqlConn.sqlInfo = mysql.createConnection({
        user: "root",
        password: "abc123456",
        database: "dbs",
    }),
    sqlConn.sqlInfoPool = mysql.createPool({
        user: "root",
        password: "abc123456",
        database: "dbs",
    });;

module.exports = sqlConn;