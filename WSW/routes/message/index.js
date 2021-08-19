const router = require('express').Router()
const controller = require('./message.controller');

//유저와 주고 받은 상대방 찾기
router.get('/readAll', controller.readAll);
//message receive list
router.get('/get', controller.get);
//write message
router.put('/write', controller.write);

module.exports = router;