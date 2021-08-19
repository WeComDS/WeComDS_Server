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

/* 스터디 목록*/
exports.study = (req, res) => {
    console.log('study_list');
    
    let sql = 'SELECT * FROM study;'
    connection.query(sql,
      (err,rows,fiedls)=>{
        res.send(rows)
      }
    )
}

// 스터디 글쓰기
exports.write = (req,res) => {
  console.log('study_write');

  const user_id = req.body.user_id;
  const study_title = req.body.study_title;
  const study_date = req.body.study_date;
  const study_style = req.body.study_style;
  const study_headcount = req.body.study_headcount;
  const study_introduce = req.body.study_introduce;
  const study_notice = req.body.study_notice;
  const study_state = req.body.study_state;
  const study_applycount = req.body.study_applycount;

  let params = [user_id, study_title, study_date, study_style, study_headcount, study_introduce, study_notice, study_state, study_applycount]
  let sql = 'INSERT INTO study(user_id, study_title, study_date, study_style, study_headcount, study_introduce, study_notice, study_state, study_applycount) VALUES(?,?,?,?,?,?,?,?,?)'
  console.log(params)
  connection.query(sql, params,
    (err, rows, fiedls) => {
      console.log(err);
      if(err){
        console.log('study write err')
        res.send(Boolean(false))
      }
      else{
        console.log('study write success')
        res.send(Boolean(true))
      }
    }  
  )
}


//스터디 삭제하기
exports.delete = (req,res) => {
  console.log('study_delete');
  
  const study_id = req.query.study_id;

  let sql = 'delete from study where study_id=?'

  connection.query(sql, study_id,
    (err, rows, fiedls) => {
      console.log(err);
      if(err){
        console.log('study delete err')
        res.send(rows)
      }else{
        console.log('study delete success')
        res.send(rows)
      }
    }  
  )

}
