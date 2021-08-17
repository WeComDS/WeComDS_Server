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

/* 후기 목록*/
exports.review = (req, res) => {
    console.log('review_list');
    
    let sql = 'SELECT * FROM review;'
    connection.query(sql,
      (err,rows,fiedls)=>{
        res.send(rows)
      }
    )
}

// 후기 글쓰기
exports.write = (req,res) => {
  console.log('review_write');

  const user_id = req.body.user_id
  const review_content = req.body.review_content;
  const review_date = req.body.review_date;
  const review_like = req.body.review_like;
  const review_CMcount = req.body.review_CMcount;

  let params = [user_id, review_content, review_date, review_like, review_CMcount]
  let sql = 'INSERT INTO review(user_id, review_content, review_date, review_like, review_CMcount) VALUES(?,?,?,?,?)'

  connection.query(sql, params,
    (err, rows, fiedls) => {
      console.log(err);
      if(err){
        console.log('review write err')
        res.send(rows)
      }
      else{
        console.log('review write success')
        res.send(rows)
      }
    }  
  )
}

//후기 삭제하기
exports.delete = (req,res) => {
  console.log('review_delete');


}