const fs = require('fs'); 
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data); 
const mysql = require('mysql'); 
const moment = require('moment');

const connection = mysql.createConnection({
  host: conf.host,

  user: conf.user,

  password: conf.password,

  port: conf.port,

  database: conf.database

})

connection.connect();

/* 메세지 전송 */
exports.list= (req, res) =>{
  console.log('message')

  const mes_sendID = req.body.mes_sendID;
  const mes_receiveID = req.body.mes_receiveID;
  const mes_content = req.body.mes_content;
  const mes_date = req.body.mes_date;
  
}