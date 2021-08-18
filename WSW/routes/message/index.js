const router = require('express').Router()
const controller = require('./message.controller');

//message receive list
router.post('/get', controller.get)
//message send list
router.post('/send', controller.send)
//write message
router.post('/write', controller.write);

module.exports = router;