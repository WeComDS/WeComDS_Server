const fs = require('fs'); 
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data); 
const mysql = require('mysql');
const schedule = require('node-schedule');
var rand_id = 0
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
  const user_id = req.body.user_id;

  connection.query(
    'INSERT INTO random(user_id, rand_content) VALUES (\''+user_id+'\',\''+rand_content+'\');',
    (err, rows, fields)=>{
      if(err){
        res.send(Boolean(false))
      } else{
        res.send(Boolean(true))
      }
    }
  )
}

/* 랜덤메세지 열람 */
exports.get = (req, res) =>{
  res.send(randomMsg)
}

/* 랜덤메세지 싫어요 */
exports.dislike = (req, res) =>{
  console.log("dislike")
  connection.query(
    // mysql에서 안전모드 해제해야함. key 컬럼으로 update 시도해서 그럼. 
    // 워크벤치에서 설정 > sql editor > 가장 아래에 update 어쩌구 체크해제 > 재시작
    'UPDATE user SET count = count+1 WHERE user_id = (SELECT user_id FROM random WHERE rand_id = '+rand_id+');',
    (err, rows, fields) => {
      if(err){
        res.send(Boolean(false))
      }else{
        res.send(Boolean(true))
      }
    }
  )
}


// 스케줄러
// 일정시간마다 랜덤하게 메세지 하나 가져와서 변수 randomMsg에 저장.
schedule.scheduleJob('*/5 * * * * *', function(){ // cron 표현식: 테스트를 위해 5초마다 실행
  var tmp_msg = randomMsg

  connection.query(
    // 랜덤하게 2개 뽑아서, 이전의 메세지와 동일하다면 두번째걸로, 아니면 첫번째걸로 randomMsg 변수에 할당
    'SELECT rand_id, rand_content FROM random ORDER BY rand() LIMIT 2;',
    (err, rows, fields)=>{
      
      const result = Object.values(JSON.parse(JSON.stringify(rows)));

      if (tmp_msg !== result[0].rand_content){
        randomMsg = result[0].rand_content
        rand_id = result[0].rand_id
      }else{
        randomMsg = result[1].rand_content
        rand_id = result[1].rand_id
      }
    }
  )
});