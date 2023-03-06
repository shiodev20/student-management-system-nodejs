const router = require('express').Router()

const { isLogin, isTeacher } = require('../middlewares/auth.middleware')
const markController = require('../controllers/mark.controller')

const { getMarkAdd, getMarkAvgCalculate, postMarkAdd } = markController()

router.get('/nhap-diem/:id', [isLogin, isTeacher], getMarkAdd)

router.get('/nhap-diem/:id/tinh-diem-trung-binh', [isLogin, isTeacher], getMarkAvgCalculate)

router.post('/nhap-diem', [isLogin, isTeacher], postMarkAdd)

module.exports = router
