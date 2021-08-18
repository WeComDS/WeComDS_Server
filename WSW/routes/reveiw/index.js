var express = require('express');
var router = express.Router();
const controller = require('./review.controller');

//후기게시판 목록
router.get('/',controller.review);
//후기게시판 글 쓰기
router.post('/write', controller.write);
//후기게시판 글 삭제
router.delete('/:id', controller.delete);

module.exports = router;