const router = require('express').Router()
const { 
  getStudentDashboard, 
  getStudentResult, 
  putStudentUpdate,
  deleteStudentDelete,
  getStudentSearch,
  getStudentAdd,
  postStudentAdd,
  getStudentUpdate
} = require('../controllers/student.controller')
const { isLogin, isStaff } = require('../middlewares/auth.middleware')


router.get('/tiep-nhan-hoc-sinh', [isLogin, isStaff], getStudentAdd)

router.post('/tiep-nhan-hoc-sinh', [isLogin, isStaff], postStudentAdd)

router.get('/cap-nhat-hoc-sinh/:id', [isLogin, isStaff], getStudentUpdate)

router.put('/cap-nhat-hoc-sinh/:id', [isLogin, isStaff], putStudentUpdate)

router.get('/ket-qua-hoc-tap/:id', [isLogin, isStaff], getStudentResult)

router.delete('/xoa-hoc-sinh/:id', [isLogin, isStaff], deleteStudentDelete)

router.get('/tim-kiem-hoc-sinh', [isLogin, isStaff], getStudentSearch)

router.use('/', [isLogin, isStaff], getStudentDashboard)

module.exports = router
