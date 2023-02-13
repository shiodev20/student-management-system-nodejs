const { classroomService, yearService } = require('../services')

function classroomController() {

  const { getClassroomByYear } = classroomService()
  const { getYearList, getCurrentYear } = yearService()

  const getClassroomDashboard = async (req, res, next) => {
    try {
      let selectedYear = ''

      if(req.query.year) selectedYear = req.query.year
      else {
        const currentYear = await getCurrentYear()
        selectedYear = currentYear.id
      }
      
      const yearList = await getYearList()
      const classrooms = await getClassroomByYear(selectedYear)

      res.render('classroom/home', {
        documentTitle: 'Quản lý lớp học',
        selectedYear,
        yearList,
        classrooms,
      })

    } catch (err) {
      const error = {
        type: 'errorMsg',
        message: err.message,
        url: '/',
      }

      next(error)
    }
  }


  const getClassroomAdd = async (req, res) => {
    res.render('classroom/add', {
      documentTitle: 'Mở lớp'
    })
  }


  const postClassroomAdd = async (req, res) => {
  }


  const getClassroomDetail = async (req, res) => {
    res.render('classroom/detail', {
      documentTitle: 'Chi tiết lớp học'
    })
  }


  const getClassroomStudentAssignment = async (req, res) => {
    res.render('classroom/student-assignment', {
      documentTitle: 'Lập danh sách lớp học',
    })
  }


  const postClassroomStudentAssignment = async (req, res) => {
  }

  const getClassroomHeadTeacherAssignment = async (req, res) => {
    res.render('classroom/headTeacher-assignment', {
      documentTitle: 'Phân công giáo viên chủ nhiệm',
    })
  }

  const postClassroomHeadTeacherAssignment = async (req, res) => {
  }


  const getClassroomSubjectTeacherAssignment = async (req, res) => {
    res.render('classroom/subjectTeacher-assignment', {
      documentTitle: 'Phân công giáo viên bộ môn',
    })
  }


  const postClassroomSubjectTeacherAssignment = async (req, res) => {
  }


  const deleteClassroomDelete = async (req, res) => {
  }


  return {
    getClassroomDashboard,
    getClassroomAdd,
    postClassroomAdd,
    getClassroomDetail,
    getClassroomStudentAssignment,
    postClassroomStudentAssignment,
    getClassroomHeadTeacherAssignment,
    getClassroomSubjectTeacherAssignment,
    postClassroomHeadTeacherAssignment,
    postClassroomSubjectTeacherAssignment,
    deleteClassroomDelete,
  }
}

module.exports = classroomController
