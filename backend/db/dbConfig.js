const mysql2 = require("mysql2");

const dbconnection = mysql2.createPool({
  user: "group-1-forum",
  host: "localhost",
  password: "123456",
  database: "group-1-forum",
  connectionLimit: 10,
});

module.exports = dbconnection.promise();
