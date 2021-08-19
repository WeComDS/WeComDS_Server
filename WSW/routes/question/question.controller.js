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

// 질문게시판 목록
exports.question = (req, res) => {
  console.log('question_list');

  let sql = 'SELECT * FROM question;'
  connection.query(sql,
    (err,rows,fields)=>{
      res.send(rows)
    }
  )
}

// 질문게시판 글쓰기
exports.write = (req,res) => {
  console.log('question_write');

  const user_id = req.body.user_id;
  const que_title = req.body.que_title;
  const que_date = req.body.que_date;
  const que_like = req.body.que_like;
  const que_CMcount = req.body.que_CMcount;

  let params = [user_id, que_title, que_date, que_like, que_CMcount]
  let sql = 'INSERT INTO question(user_id, que_title, que_date, que_like, que_CMcount) VALUES(?,?,?,?,?)'

  connection.query(sql, params,
    (err, rows, fiedls) => {
      console.log(err);
      if(err){
        console.log('question write err')
        res.send(rows)
      }else{
        console.log('question write success')
        res.send(rows)
      }
    }
  )
}

//질문게시판 삭제하기
exports.delete = (req,res) => {
  console.log('review_delete');
  
  const que_id = req.query.que_id;

  let sql = 'delete from question where que_id=?'

  connection.query(sql, que_id,
    (err, rows, fiedls) => {
      console.log(err);
      if(err){
        console.log('question delete err')
        res.send(rows)
      }else{
        console.log('question delete success')
        res.send(rows)
      }
    }  
  )

}

// 질문게시판 댓글 목록
exports.question = (req, res) => {
  console.log('question_comment_list');

  let sql = 'SELECT * FROM question;'
  connection.query(sql,
    (err,rows,fields)=>{
      res.send(rows)
    }
  )
}

// 질문게시판 댓글쓰기
exports.write = (req,res) => {
  console.log('question_comment_write');

  const user_id = req.body.user_id;
  const que_title = req.body.que_title;
  const que_date = req.body.que_date;
  const que_like = req.body.que_like;
  const que_CMcount = req.body.que_CMcount;

  let params = [user_id, que_title, que_date, que_like, que_CMcount]
  let sql = 'INSERT INTO question(user_id, que_title, que_date, que_like, que_CMcount) VALUES(?,?,?,?,?)'

  connection.query(sql, params,
    (err, rows, fiedls) => {
      console.log(err);
      if(err){
        console.log('question write err')
        res.send(rows)
      }else{
        console.log('question write success')
        res.send(rows)
      }
    }
  )
}

//질문게시판 댓글 삭제하기
exports.delete = (req,res) => {
  console.log('question_comment_delete');
  
  const que_id = req.query.que_id;

  let sql = 'delete from question_comment where ques_comment_id=?'

  connection.query(sql, ques_comm_id,
    (err, rows, fiedls) => {
      console.log(err);
      if(err){
        console.log('question delete err')
        res.send(rows)
      }else{
        console.log('question delete success')
        res.send(rows)
      }
    }  
  )

}