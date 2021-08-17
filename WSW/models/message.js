const mysql = require('mysql'); 
const connection = mysql.createConnection({
    host: conf.host,
  
    user: conf.user,
  
    password: conf.password,
  
    port: conf.port,
  
    database: conf.database
  
  })
  
  connection.connect();