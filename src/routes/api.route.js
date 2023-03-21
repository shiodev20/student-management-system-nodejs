const router = require('express').Router()

const { postChangePassword } = require('../controllers/api.controller')

const { isLogin } = require('../middlewares/auth.middleware')

router.post('/doi-mat-khau/:id', [isLogin], postChangePassword)

module.exports = router