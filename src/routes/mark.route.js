const router = require('express').Router()
const { getMarkAdd, getMarkAvgCalculate, postMarkAdd } = require('../controllers/mark.controller')
const { isLogin, isTeacher } = require('../middlewares/auth.middleware')


router.get('/nhap-diem/:id', [isLogin, isTeacher], getMarkAdd)

router.get('/nhap-diem/:id/tinh-diem-trung-binh', [isLogin, isTeacher], getMarkAvgCalculate)

router.post('/nhap-diem', [isLogin, isTeacher], postMarkAdd)

module.exports = router
