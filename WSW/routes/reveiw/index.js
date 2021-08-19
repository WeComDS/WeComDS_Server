var express = require('express');
var router = express.Router();
const controller = require('./review.controller');
//const com_controller = require('./review_com.controller');

//후기게시판 목록
router.get('/',controller.review);
//후기게시판 글 쓰기
router.post('/write', controller.write);
//후기게시판 글 삭제
router.delete('/:id', controller.delete);

/*
//후기게시판 게시글+댓글 목록
//그러면지금 여자리에 해당 게시글의 아이디가 들어가줘야 하는 부분?
router.get('/comment',com_controller.review);
//후기게시판 댓글 쓰기
router.post('/write/comment', com_controller.write);
//후기게시판 댓글 삭제
router.delete(':id/comment', com_controller.delete);
*/
module.exports = router;