const { classroomService, yearService, gradeService, semesterService } = require('../services')
const customError = require('../utils/customError')

function classroomController() {

  const { getClassroomById, getClassroomByYear, addClassroom } = classroomService()
  const { getYearList, getCurrentYear } = yearService()
  const { getCurrentSemester } = semesterService()
  const { getGradeList } = gradeService()

  const err = { type: '', message: '', url: '' }


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

      if (classrooms.length == 0) {
        throw customError(1, `Không có lớp học nào được mở trong năm học ${selectedYear}`)
      }

      res.render('classroom/home', {
        documentTitle: 'Quản lý lớp học',
        selectedYear,
        years,
        classrooms,
      })

    } catch (error) {

      switch (error.code) {
        case 0:
          err.type = 'errorMsg'
          err.message = error.message
          err.url = '/'
          break;
        case 1:
          err.type = 'errorMsg'
          err.message = error.message
          err.url = `/lop-hoc`
      }

      return next(err)
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

    } catch (error) {
      err.type = 'errorMsg'
      err.message = error.message
      err.url = '/lop-hoc/mo-lop-hoc'

      next(err)
    }
  }


  const postClassroomAdd = async (req, res, next) => {
    try {
      if (!req.body.year || !req.body.grade || !req.body.classroomName) {
        throw customError(2, 'Vui lòng nhập đầy đủ thông tin')
      }
      const classroom = {
        yearId: req.body.year,
        gradeId: req.body.grade,
        name: req.body.classroomName.toUpperCase(),
      }

      const result = await addClassroom(classroom)

      if(result) {
        req.flash('successMsg', `Lớp học được tạo thành công`)
        res.redirect('/lop-hoc/mo-lop-hoc')
      }

    } catch (error) {

      switch (error.code) {
        case 0:
          err.type = 'errorMsg'
          err.message = error.message
          err.url = '/lop-hoc/mo-lop-hoc'
          break;
        case 1:
          err.type = 'errorMsg'
          err.message = error.message
          err.url = '/lop-hoc/mo-lop-hoc'
          break;
        case 2:
          err.type = 'formMsg'
          err.message = error.message
          err.url = '/lop-hoc/mo-lop-hoc'
          break;
      }

      next(err)
    }
  }


  const getClassroomDetail = async (req, res, next) => {
    const id = req.params.id

    try {
      
      const classroom = await getClassroomById(id)

      if(!classroom) {
        throw customError(1, `Không tìm thấy lớp học ${id}`)
      }

      const students = await classroom.getStudents()
      const teachingAssignments = await classroom.getTeachingAssignments()

      const subjectTeachers = []

      await Promise.all(teachingAssignments.map(async item => {
        const subject = await item.getSubject()
        const subjectTeacher = await item.getSubjectTeacher()

        subjectTeachers.push([subject, subjectTeacher])
      }))
      
      subjectTeachers.sort((a, b) => {
        return Number(a[0].id.slice(-1)) - Number(b[0].id.slice(-1))
      })

      
      res.render('classroom/detail', {
        documentTitle: 'Chi tiết lớp học',
        classroom,
        students,
        subjectTeachers,
      })

    } catch (error) {
      switch (error.code) {
        case 0:
          err.type = 'errorMsg'
          err.message = error.message
          err.url = '/lop-hoc'
          break;
        case 1:
          err.type = 'errorMsg'
          err.message = error.message
          err.url = '/lop-hoc'
          break;
      }

      next(err)
    }
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
