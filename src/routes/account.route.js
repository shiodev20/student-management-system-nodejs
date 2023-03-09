const router = require('express').Router()
const {
  getNoAccountAdd,
  getAccountAdd,
  postAccountAdd,
  getAccountUpdate,
  putAccountUpdate,
  putAccountUpdateStatus,
  deleteAccountDelete } = require('../controllers/account.controller')
const { isLogin, isAdmin } = require('../middlewares/auth.middleware')


router.get('/danh-sach-chua-cap-tai-khoan', [isLogin, isAdmin], getNoAccountAdd)

router.get('/tao-tai-khoan/:id', [isLogin, isAdmin], getAccountAdd)

router.post('/tao-tai-khoan/:id', [isLogin, isAdmin], postAccountAdd)

router.get('/cap-nhat-tai-khoan/:id', [isLogin, isAdmin], getAccountUpdate)

router.put('/cap-nhat-tai-khoan', [isLogin, isAdmin], putAccountUpdate)

router.put('/cap-nhat-trang-thai/:id', [isLogin, isAdmin], putAccountUpdateStatus)

router.delete('/xoa-tai-khoan/:id', [isLogin, isAdmin], deleteAccountDelete)


module.exports = router
