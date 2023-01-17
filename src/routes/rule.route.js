const router = require('express').Router()

const ruleController = require('../controllers/rule.controller')

const { getRuleDashboard, getRuleUpdate, putRuleUpdate } = ruleController()

router.get('/cap-nhat-quy-dinh', getRuleUpdate)

router.put('/cap-nhat-quy-dinh', putRuleUpdate)

router.get('/', getRuleDashboard)

module.exports = router
