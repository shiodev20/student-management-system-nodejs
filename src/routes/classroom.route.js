const router = require('express').Router()

const classroomController = require('../controllers/classroom.controller')

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
  deleteClassroomDelete
} = classroomController()

router.get('/mo-lop-hoc', getClassroomAdd)

router.post('/mo-lop-hoc', postClassroomAdd)

router.get('/lap-danh-sach-lop-hoc/:id', getClassroomStudentAssignment)

router.post('/lap-danh-sach-lop-hoc/:id', postClassroomStudentAssignment)

router.get('/phan-cong-gvcn/:id', getClassroomHeadTeacherAssignment)

router.post('/phan-cong-gvcn', postClassroomHeadTeacherAssignment)

router.get('/phan-cong-gvbm/:id', getClassroomSubjectTeacherAssignment)

router.post('/phan-cong-gvbm',  postClassroomSubjectTeacherAssignment)

router.get('/:id', getClassroomDetail)

router.delete('/xoa-lop-hoc/:id', deleteClassroomDelete)

router.use('/', getClassroomDashboard)

module.exports = router
