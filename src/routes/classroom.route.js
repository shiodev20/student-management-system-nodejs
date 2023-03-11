const router = require('express').Router()
const { 
  getClassroomDashboard, 
  getClassroomDetail, 
  getClassroomHeadTeacherAssignment,
  getClassroomSubjectTeacherAssignment,
  getClassroomStudentAssignment,
  getClassroomAdd,
  postClassroomAdd,
  postClassroomStudentAssignment,
  postClassroomHeadTeacherAssignment,
  postClassroomSubjectTeacherAssignment,
  deleteStudentClassroomDelete,
  deleteClassroomDelete,
} = require('../controllers/classroom.controller')
const { isLogin, isStaff } = require('../middlewares/auth.middleware')


router.get('/mo-lop-hoc', [isLogin, isStaff], getClassroomAdd)

router.post('/mo-lop-hoc', [isLogin, isStaff], postClassroomAdd)

router.get('/lap-danh-sach-lop-hoc/:id', [isLogin, isStaff], getClassroomStudentAssignment)

router.post('/lap-danh-sach-lop-hoc/:id', [isLogin, isStaff], postClassroomStudentAssignment)

router.get('/phan-cong-gvcn/:id', [isLogin, isStaff], getClassroomHeadTeacherAssignment)

router.post('/phan-cong-gvcn/:id', [isLogin, isStaff], postClassroomHeadTeacherAssignment)

router.get('/phan-cong-gvbm/:id', [isLogin, isStaff], getClassroomSubjectTeacherAssignment)

router.post('/phan-cong-gvbm/:id', [isLogin, isStaff], postClassroomSubjectTeacherAssignment)

router.delete('/xoa-lop-hoc/:id', [isLogin, isStaff], deleteClassroomDelete)

router.delete('/:id/xoa-hoc-sinh/:studentId', [isLogin, isStaff], deleteStudentClassroomDelete)

router.get('/:id', [isLogin, isStaff], getClassroomDetail)

router.use('/', [isLogin, isStaff], getClassroomDashboard)

module.exports = router
