const mysql = require("mysql2");

const db = mysql.createPool({
  connectionLimit: 15,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "lamgico123",
  database: "stackoverflow",
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL");
});

module.exports = db;
