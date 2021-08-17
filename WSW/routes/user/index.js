const router = require('express').Router()
const controller = require('./user.controller')

router.post('/signup', controller.signup)

module.exports = router;