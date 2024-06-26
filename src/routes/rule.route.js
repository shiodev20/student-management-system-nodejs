const router = require('express').Router()

const { getRuleDashboard, putGeneralRuleUpdate, putSubjectRuleUpdate, putMarkTypeRuleUpdate, putSchoolTimeUpdate } = require('../controllers/rule.controller')

const { isLogin, isStaff } = require('../middlewares/auth.middleware')


router.put('/cap-nhat-quy-dinh', [isLogin, isStaff], putGeneralRuleUpdate)

router.put('/cap-nhat-mon-hoc', [isLogin, isStaff], putSubjectRuleUpdate)

router.put('/cap-nhat-loai-diem', [isLogin, isStaff], putMarkTypeRuleUpdate)

router.put('/cap-nhat-nien-khoa', [isLogin, isStaff], putSchoolTimeUpdate)

router.use('/', [isLogin, isStaff], getRuleDashboard)

module.exports = router
