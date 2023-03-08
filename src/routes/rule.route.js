const router = require('express').Router()

const { getRuleDashboard, getRuleUpdate, putRuleUpdate } = require('../controllers/rule.controller')


router.get('/cap-nhat-quy-dinh', getRuleUpdate)

router.put('/cap-nhat-quy-dinh', putRuleUpdate)

router.get('/', getRuleDashboard)

module.exports = router
