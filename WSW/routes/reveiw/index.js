var express = require('express');
var router = express.Router();
const controller = require('./review.controller');

//review 목록
router.get('/review',controller.review)

module.exports = router;