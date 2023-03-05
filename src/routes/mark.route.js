const router = require('express').Router()

const { isLogin, isTeacher } = require('../middlewares/auth.middleware')
const markController = require('../controllers/mark.controller')

const { getMarkAdd, postMarkAdd } = markController()

router.get('/nhap-diem/:id', [isLogin, isTeacher], getMarkAdd)

router.post('/nhap-diem', [isLogin, isTeacher], postMarkAdd)

module.exports = router
