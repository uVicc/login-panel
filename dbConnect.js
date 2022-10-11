const mysql = require('mysql2');

const dbConnect = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "aside-website",
})

module.exports = dbConnect.promise();