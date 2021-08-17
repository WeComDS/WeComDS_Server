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

/* 후기 불러오기 */
exports.review = (req, res) => {
    console.log('review')

    const review_id = req.body.review_id;
    const user_id = req.body.user_id;
    const review_content = req.body.review_content;
    const review_date = req.body.review_date;
    const review_like = req.body.review_like;
    const review_CMount = req.body.review_CMount;

    let params = [review_id, user_id, review_content, review_date, review_like, review_CMount]
    let sql = 'INSERT INTO review(review_id, user_id, review_content, review_date, review_like, review_CMount) VALUES (?, ?, ?, ?, ?);';

    connection.query(sql,params,
      (err, rows, fields) =>{
        console.log(err);
        if(err){ //후기 등록 실패
            console.log('review err')
            res.send(rows)
        }
        else{ //후기 등록 성공
          console.log('review success')
          res.send(rows)
        }
      }
    )
}