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


/* question 댓글 목록*/
exports.question_comment = (req, res) => {
    console.log('question_comm_list');
    
    let sql = 'SELECT * FROM question_comment;'
    connection.query(sql,
      (err,rows,fiedls)=>{
        res.send(rows)
      }
    )
  }
  
  // question 댓글쓰기
  exports.write = (req,res) => {
  console.log('question_comm_write');
  
  const user_id = req.body.user_id;
  const question_id = req.body.question_id;
  const question_comm_content = req.body.question_comm_content;
  //const question_comm_date = req.body.question_comm_date;태영이한테 물어봐야 자동인지 아닌지 

  
  let params = [user_id,question_id, question_comm_content]
  let sql = 'INSERT INTO question_comment(user_id, question_id, question_comm_id, question_comm_content,question_comm_date, question_comm_like) VALUES(?,?,?,?,?,?)'
  //insert 
  connection.query(sql, params,
    (err, rows, fiedls) => {
      console.log(err);
      if(err){
        console.log('question_comm write err')
        res.send(rows)
      }
      else{
        console.log('question_comm write success')
        res.send(rows)
      }
    }  
  )
  }
  
  //question 댓글 삭제하기
  exports.delete = (req,res) => {
  console.log('question_comm_delete');
  
  const question_id = req.query.question_id;
  
  let sql = 'delete from question_comment where question_comment_id=?'
  
  connection.query(sql, review_id,
    (err, rows, fiedls) => {
      console.log(err);
      if(err){
        console.log('question_comm delete err')
        res.send(rows)
      }else{
        console.log('question_comm delete success')
        res.send(rows)
      }
    }  
  )
  
  }
  