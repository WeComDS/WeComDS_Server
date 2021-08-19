const router = require('express').Router()
const controller = require('./random.controller')

router.post('/send', controller.send)
router.post('/get', controller.get)
router.post('/dislike', controller.dislike)

module.exports = router;