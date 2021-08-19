
const router = require('express').Router()
const controller = require('./question.controller')

//질문게시판 목록
router.get('/', controller.question);
//질문게시판 글 쓰기
router.post('/write', controller.write);
//질문게시판 글 삭제
router.delete('/:id', controller.delete);

/*
//question게시판 댓글 목록
router.get('/comment',com_controller.question);
//question게시판 댓글 쓰기
router.post('/write/comment', com_controller.write);
//question게시판 댓글 삭제
router.delete(':id/comment', com_controller.delete);
*/


module.exports = router;