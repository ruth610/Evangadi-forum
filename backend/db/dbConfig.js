const mysql2 = require("mysql2");

const dbconnection = mysql2.createPool({
  user: "evhome-admin",
  host: "localhost",
  password: "123456",
  database: "evangadi-home-db",
  connectionLimit: 10,
});

module.exports = dbconnection.promise();
