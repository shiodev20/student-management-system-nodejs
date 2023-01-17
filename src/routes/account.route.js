const router = require('express').Router()

const accountController = require('../controllers/account.controller')

const {
  getAccountAdd, 
  postAccountAdd, 
  getAccountUpdate, 
  putAccountUpdate,
  putAccountUpdateStatus,
  deleteAccountDelete } = accountController()

router.get('/tao-tai-khoan', getAccountAdd)

router.post('/tao-tai-khoan', postAccountAdd)

router.get('/cap-nhat-tai-khoan/:id', getAccountUpdate)

router.put('/cap-nhat-tai-khoan', putAccountUpdate)

router.put('/cap-nhat-trang-thai/:id', putAccountUpdateStatus)

router.delete('/xoa-tai-khoan/:id', deleteAccountDelete)

module.exports = router
