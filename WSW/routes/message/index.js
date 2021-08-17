const express = require('express');
const router = express.Router();
const controller = require('./message.controller');

//message receive list
router.get('/message', controller.register)
//message send list
router.get('/message_sent', controller.register)

module.exports = router;