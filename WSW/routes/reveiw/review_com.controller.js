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


/* 후기 댓글 목록*/
exports.review_comment = (req, res) => {
    console.log('review_comm_list');
    
    let sql = 'SELECT * FROM review_comment;'
    connection.query(sql,
      (err,rows,fiedls)=>{
        res.send(rows)
      }
    )
  }
  
  // 후기 댓글쓰기
  exports.write = (req,res) => {
  console.log('review_comm_write');
  
  const user_id = req.body.user_id;
  const review_id = req.body.review_id;
  const review_comm_content = req.body.review_comm_content;
  //const review_comm_date = req.body.review_comm_date;태영이한테 물어봐야 자동인지 아닌지 

  
  let params = [user_id, review_id, review_comm_content]
  let sql = 'INSERT INTO review_comment(user_id, review_id, review_comm_id, review_comm_content,review_comm_date, review_comm_like) VALUES(?,?,?,?,?,?)'
  //insert 
  connection.query(sql, params,
    (err, rows, fiedls) => {
      console.log(err);
      if(err){
        console.log('review_comm write err')
        res.send(rows)
      }
      else{
        console.log('review_comm write success')
        res.send(rows)
      }
    }  
  )
  }
  
  //후기 댓글 삭제하기
  exports.delete = (req,res) => {
  console.log('review_comm_delete');
  
  const review_id = req.query.review_id;
  
  let sql = 'delete from review_comment where review_comment_id=?'
  
  connection.query(sql, review_id,
    (err, rows, fiedls) => {
      console.log(err);
      if(err){
        console.log('review_comm delete err')
        res.send(rows)
      }else{
        console.log('review_comm delete success')
        res.send(rows)
      }
    }  
  )
  
  }
  