const mysql = require('mysql');
 
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'URLs'
});
 
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});
 
module.exports = connection;