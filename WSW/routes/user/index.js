const router = require('express').Router()
const controller = require('./user.controller')

router.post('/signup', controller.signup)
router.post('/login', controller.login)

module.exports = router;