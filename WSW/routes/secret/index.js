const router = require('express').Router()
const controller = require('./secret.controller')

//비밀게시판 목록
router.get('/',controller.secret);
//비밀게시판 글 쓰기
router.post('/write', controller.write);
//비밀게시판 글 삭제
router.delete('/:id', controller.delete);

module.exports = router;