const mysql2 = require("mysql2");

const dbconnection = mysql2.createPool({
  // user: "evangadiForum",
  // host: "localhost",
  // password: "12345678",
  // database: "evangadiForum",
  // connectionLimit: 10,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit:  10,
  port: process.env.DB_PORT
});

module.exports = dbconnection.promise();
