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

/* 검색하기 */
exports.search = (req, res) => {

}
/* 글 전체 조회 */
exports.getAll = (req, res) => {

}
/* 글 조회 */
exports.secret = (req, res) => {
  console.log('secret_list');
    
    let sql = 'SELECT * FROM secret;'
    connection.query(sql,
      (err,rows,fiedls)=>{
        res.send(rows)
      }
    )
}

/* 등록하기 */
exports.write = (req,res) => {
  console.log('secret_write');

  const user_id = req.body.user_id;
  const sec_content = req.body.sec_content;
  const sec_date = req.body.sec_date;
  const sec_like = req.body.sec_like;
  const sec_CMcount = req.body.sec_CMcount;

  let params = [user_id, sec_content, sec_date, sec_like, sec_CMcount]
  let sql = 'INSERT INTO secret(user_id, sec_content, sec_date, sec_like, sec_CMcount) VALUES(?,?,?,?,?)'

  connection.query(sql, params,
    (err, rows, fiedls) => {
      console.log(err);
      if(err){
        console.log('secret write err')
        res.send(rows)
      }
      else{
        console.log('secret write success')
        res.send(rows)
      }
    }  
  )
}


/* 삭제하기 */
exports.delete = (req, res) => {
  console.log('secret_delete');
  
  const sec_id = req.query.sec_id;

  let sql = 'delete from secret where sec_id=?'

  connection.query(sql, sec_id,
    (err, rows, fiedls) => {
      console.log(err);
      if(err){
        console.log('secret delete err')
        res.send(rows)
      }else{
        console.log('secret delete success')
        res.send(rows)
      }
    }  
  )
}