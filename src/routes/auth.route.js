const router = require('express').Router()
const { getLogin, getLogout, postLogin } = require('../controllers/auth.controller')
const { isLogin, ensureLogin } = require('../middlewares/auth.middleware')


router.get('/dang-nhap', [ensureLogin], getLogin)

router.post('/dang-nhap', postLogin)

router.get('/dang-xuat', [isLogin], getLogout)

module.exports = router
