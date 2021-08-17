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
exports.get = (req, res) => {

}

/* 등록하기 */
exports.post = (req, res) => {

}

/* 삭제하기 */
exports.delete = (req, res) => {

}