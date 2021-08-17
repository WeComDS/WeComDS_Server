var express = require('express');
var router = express.Router();
const controller = require('./study.controller');

//스터디게시판 목록
router.get('/',controller.study);
//스터디게시판 글 쓰기
router.post('/write', controller.write);
//스터디게시판 글 삭제
router.delete('/:id', controller.delete);

module.exports = router;