const router = require('express').Router()

const authController = require('../controllers/auth.controller')

const { isLogin, ensureLogin } = require('../middlewares/auth.middleware')
const { getLogin, getLogout, postLogin } = authController()

router.get('/dang-nhap', [ensureLogin], getLogin)

router.post('/dang-nhap', postLogin)

router.get('/dang-xuat', [isLogin], getLogout)

module.exports = router
