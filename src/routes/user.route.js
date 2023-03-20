const router = require('express').Router()

const { getUserAdd, postUserAdd, getUserUpdate, putUserUpdate, deleteUserDelete } = require('../controllers/user.controller')
const { isLogin, isHR } = require('../middlewares/auth.middleware')

router.get('/tao-nhan-vien', [isLogin, isHR], getUserAdd)

router.post('/tao-nhan-vien', [isLogin, isHR], postUserAdd)

router.get('/cap-nhat-nhan-vien/:id', [isLogin, isHR], getUserUpdate)

router.put('/cap-nhat-nhan-vien/:id', [isLogin, isHR], putUserUpdate)

router.delete('/xoa-nhan-vien/:id', [isLogin, isHR], deleteUserDelete)

module.exports = router
