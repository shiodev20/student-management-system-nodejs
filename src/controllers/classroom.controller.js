const { classroomService, yearService, gradeService } = require('../services')

function classroomController() {

  const { getClassroomByYear, addClassroom,  } = classroomService()
  const { getYearList, getCurrentYear } = yearService()
  const { getGradeList } = gradeService()

  const getClassroomDashboard = async (req, res, next) => {
    try {
      let selectedYear = ''

      if (req.query.year) {
        selectedYear = req.query.year
      }
      else {
        const currentYear = await getCurrentYear()
        selectedYear = currentYear.id
      }

      const years = await getYearList()
      const classrooms = await getClassroomByYear(selectedYear)

      if(classrooms.length == 0) {
        const error = {
          type: 'errorMsg',
          message: `Không có lớp học nào được mở trong năm học ${selectedYear}`,
          url: `/lop-hoc`,
        }
        return next(error)
      }

      res.render('classroom/home', {
        documentTitle: 'Quản lý lớp học',
        selectedYear,
        years,
        classrooms,
      })

    } catch (err) {
      console.log('error');

      const error = {
        type: 'errorMsg',
        message: err.message,
        url: '/',
      }
      next(error)
    }
  }


  const getClassroomAdd = async (req, res, next) => {
    try {
      const currentYear = await getCurrentYear()
      const grades = await getGradeList()

      res.render('classroom/add', {
        documentTitle: 'Mở lớp',
        currentYear,
        grades,
      })
    } catch (err) {
      const error = {
        type: 'errorMsg',
        message: err.message,
        url: '/lop-hoc/mo-lop-hoc'
      }

      next(error)
    }
  }


  const postClassroomAdd = async (req, res, next) => {
    try {
      if(!req.body.year || !req.body.grade || !req.body.classroomName) {
        const error = {
          type: 'formMsg',
          message: 'Vui lòng nhập đầy đủ thông tin',
          url: '/lop-hoc/mo-lop-hoc'
        }

        next(error)
      }

      const classroom = {
        yearId: req.body.year,
        gradeId: req.body.grade,
        name: req.body.classroomName.toUpperCase(),
      }

      const result = await addClassroom(classroom)

      console.log(result);
    } catch (err) {
      console.log(err);
    }
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
