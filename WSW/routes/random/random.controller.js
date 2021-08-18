const fs = require('fs'); 
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data); 
const mysql = require('mysql');
const schedule = require('node-schedule');
var randomMsg = ""

const connection = mysql.createConnection({
  host: conf.host,

  user: conf.user,

  password: conf.password,

  port: conf.port,

  database: conf.database

})
connection.connect();


/* 랜덤메세지 전송 */
// 정확하게는 save 개념이 맞음.
exports.send= (req, res) =>{
  const rand_content = req.body.rand_content;
  //const rand_count = 0;

  connection.query(
    'INSERT INTO random(rand_content, rand_count) VALUES (\''+rand_content+'\', 0);',
    (err, rows, fields)=>{
      res.send(rows) // TODO
    }
  )
}

/* 랜덤메세지 열람 */
exports.get = (req, res) =>{
  res.send(randomMsg)
}

// 스케줄러
// 일정시간마다 랜덤하게 메세지 하나 가져와서 변수 randomMsg에 저장.
schedule.scheduleJob('5 * * * * *', function(){ // cron 표현식: 테스트를 위해 5초마다 실행
  var tmp = randomMsg

  connection.query(
    // 랜덤하게 2개 뽑아서, 이전의 메세지와 동일하다면 두번째걸로, 아니면 첫번째걸로 randomMsg 변수에 할당
    'SELECT rand_content FROM random ORDER BY rand() LIMIT 2;',
    (err, rows, fields)=>{
      var row1 = JSON.stringify(rows[0])
      var row2 = JSON.stringify(rows[1])

      if (tmp !== row1){
        randomMsg = row1
      }else{
        randomMsg = row2
      }
      console.log(randomMsg)
    }
  )
});