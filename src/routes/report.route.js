const router = require('express').Router()
const {
  getReportClassroomSubject, 
  getReportDashboard, 
  getReportSubject, 
  getReportSemeter 
} = require('../controllers/report.controller')

const { isLogin, isStaff } = require('../middlewares/auth.middleware')

router.get('/tong-ket-diem-mon-hoc-cua-lop', [isLogin, isStaff], getReportClassroomSubject)

router.get('/tong-ket-mon-hoc', [isLogin, isStaff], getReportSubject)

router.get('/tong-ket-hoc-ky', [isLogin, isStaff], getReportSemeter)

router.get('/', [isLogin, isStaff], getReportDashboard)

module.exports = router
