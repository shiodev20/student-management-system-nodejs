const router = require('express').Router()
const {
  getAccountSearch,
  getAccountAddSearch,
  getAccountAdd,
  postAccountAdd,
  putAccountUpdateStatus,
  putAccountResetPassword,
  deleteAccountDelete } = require('../controllers/account.controller')
const { isLogin, isAdmin } = require('../middlewares/auth.middleware')


router.get('/tao-tai-khoan', [isLogin, isAdmin], getAccountAdd)

router.get('/tao-tai-khoan/tim-kiem-tai-khoan', [isLogin, isAdmin], getAccountAddSearch)

router.post('/tao-tai-khoan/:id', [isLogin, isAdmin], postAccountAdd)

router.get('/tim-kiem-tai-khoan', [isLogin, isAdmin], getAccountSearch)

router.put('/cap-nhat-trang-thai/:id', [isLogin, isAdmin], putAccountUpdateStatus)

router.put('/reset-mat-khau/:id', [isLogin, isAdmin], putAccountResetPassword)

router.delete('/xoa-tai-khoan/:id', [isLogin, isAdmin], deleteAccountDelete)


module.exports = router
