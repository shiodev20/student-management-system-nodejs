const router = require('express').Router()
const {
  getReportClassroomSubject, 
  getReportDashboard, 
  getReportSubject, 
  getReportSemeter 
} = require('../controllers/report.controller')


router.get('/tong-ket-diem-mon-hoc-cua-lop', getReportClassroomSubject)

router.get('/tong-ket-mon-hoc', getReportSubject)

router.get('/tong-ket-hoc-ky', getReportSemeter)

router.get('/', getReportDashboard)

module.exports = router
