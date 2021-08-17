const express = require('express');
const router = express.Router();
const controller = require('./message.controller');

//message list
router.get('/list', controller.register)

module.exports = router;