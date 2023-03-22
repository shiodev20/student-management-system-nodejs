const router = require('express').Router()
const { getLogin, getLogout, postLogin, getForgotPassword, getResetPassword, postResetPassword, postForgotPassword } = require('../controllers/auth.controller')
const { isLogin, ensureLogin } = require('../middlewares/auth.middleware')


router.get('/dang-nhap', [ensureLogin], getLogin)

router.post('/dang-nhap', postLogin)

router.get('/quen-mat-khau', [ensureLogin], getForgotPassword)

router.post('/quen-mat-khau', [ensureLogin], postForgotPassword)

router.get('/lay-lai-mat-khau/:id', [ensureLogin], getResetPassword)

router.post('/lay-lai-mat-khau/:id', [ensureLogin], postResetPassword)

router.get('/dang-xuat', [isLogin], getLogout)

module.exports = router
