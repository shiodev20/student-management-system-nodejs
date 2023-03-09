const router = require('express').Router()
const { getApiAddAccount } = require('../controllers/api.controller')
const { isLogin, isAdmin } = require('../middlewares/auth.middleware')

router.get('/cap-tai-khoan/:id', [isLogin, isAdmin], getApiAddAccount)

module.exports = router