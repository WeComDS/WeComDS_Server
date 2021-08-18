const fs = require('fs'); 
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data); 
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,

  user: conf.user,

  password: conf.password,

  port: conf.port,

  database: conf.database

})

connection.connect();

/* 받은 쪽지함 */
exports.get= (req, res) =>{
  console.log('message get');

  const mes_receiveID = req.body.mes_receiveID;
  
  let sql = 'SELECT mes_receiveID FROM message;';

  connection.query(sql, mes_receiveID,

    (err, rows, fields) => {
      res.send(rows)
    }
  )
}

/* 보낸 쪽지함 */
exports.send= (req, res) =>{
  console.log('message send');

  const mes_sendID = req.body.mes_sendID;
  //const mes_receiveID = req.body.mes_receiveID;
  //const mes_content = req.body.mes_content;
  //const mes_date = req.body.mes_date;
  
  let sql = 'SELECT mes_sendID FROM message;'

  connection.query(sql, mes_sendID,

    (err, rows, fields) => {
      res.send(rows)
    }
  )
}

//write message
exports.write = (req,res) => {
  console.log('message_write');

  const mes_sendID = req.body.mes_sendID;
  const mes_receiveID = req.body.mes_receiveID;
  const mes_content = req.body.mes_content;
  const mes_date = req.body.mes_date;

  let params = [mes_sendID, mes_receiveID, mes_content, mes_date]
  let sql = 'INSERT INTO message(mes_sendID, mes_receiveID, mes_content, mes_date) VALUES(?,?,?,?)'

  connection.query(sql, params,
    (err, rows, fiedls) => {
      console.log(err);
      if(err){
        console.log('message write err')
        res.send(rows)
      }else{
        console.log('message write success')
        res.send(rows)
      }
    }
  )
}