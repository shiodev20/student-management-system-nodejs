const router = require('express').Router()

const { getRuleDashboard } = require('../controllers/rule.controller')

const { isLogin, isStaff } = require('../middlewares/auth.middleware')

// router.get('/cap-nhat-quy-dinh', [isLogin, isAdmin], getRuleUpdate)

// router.put('/cap-nhat-quy-dinh', [isLogin, isAdmin], putRuleUpdate)

router.get('/', [isLogin, isStaff], getRuleDashboard)

module.exports = router
