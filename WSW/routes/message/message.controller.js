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

//유저와 주고 받은 상대방 찾기
exports.readAll = (req, res) => {
  console.log('message read all');

  const user_id = req.body.user_id;
  const mes_sendID = req.body.mes_sendID;
  const mes_receiveID = req.body.mes_receiveID;
  const mes_content = req.body.mes_content;
  
  //const v = [user_id, user_id];
  let params = [user_id, mes_sendID, mes_receiveID, mes_content]
  let sql = 'SELECT DISTINCT mes_sendID, mes_receiveID, mes_content FROM message WHERE user_id = 1 ORDER BY mes_date DESC LIMIT 1;'

  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows)
    })
}


/* 받은 쪽지함(쪽지읽기) */
exports.get= (req, res) =>{
  console.log('message list');

  const mes_sendID = req.body.mes_sendID;
  const mes_receiveID = req.body.mes_receiveID;
  const mes_content = req.body.mes_content;
  const mes_date = req.body.mes_date;
  
  const params = [mes_sendID, mes_content, mes_date];
  let sql = 'SELECT mes_sendID, mes_content, mes_date FROM message ORDER BY mes_date ASC;'
  connection.query(sql, params,

    (err, rows, fields) => {
      res.send(rows)
    }
  )
}

//write message
exports.write = (req, res) => {
  console.log('message_write');

  const user_id = req.body.user_id;
  const mes_sendID = req.body.mes_sendID;
  const mes_receiveID = req.body.mes_receiveID;
  const mes_content = req.body.mes_content;
  const mes_date = req.body.mes_date;

  let params = [user_id, mes_sendID, mes_receiveID, mes_content, mes_date]
  let sql = 'INSERT INTO message (user_id, mes_sendID, mes_receiveID, mes_content, mes_date) VALUES(?,?,?,?,?);'

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