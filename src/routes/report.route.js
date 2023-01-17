const router = require('express').Router()

const reportController = require('../controllers/report.controller')

const {
  getReportClassroomSubject, 
  getReportDashboard, 
  getReportSubject, 
  getReportSemeter 
} = reportController()

router.get('/tong-ket-diem-mon-hoc-cua-lop', getReportClassroomSubject)

router.get('/tong-ket-mon-hoc', getReportSubject)

router.get('/tong-ket-hoc-ky', getReportSemeter)

router.get('/', getReportDashboard)

module.exports = router
