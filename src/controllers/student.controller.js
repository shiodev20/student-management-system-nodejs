const { studentService, yearService, semesterService, ruleService } = require('../services')

function studentController() {

  const { 
    getStudentList, 
    getStudentById, 
    getStudentBySearch, 
    addStudent, 
    updateStudent, 
    deleteStudent,
  } = studentService()
  const { getCurrentYear } = yearService()
  const { getCurrentSemester } = semesterService()
  const { getRuleList, checkStudentAge } = ruleService()

  const getStudentDashboard = async (req, res, next) => {
    try {
      const currentYear = await getCurrentYear()
      const currentSemester = await getCurrentSemester()
      const students = await getStudentList()

      res.render('student/home', {
        documentTitle: 'Quản lý học sinh',
        students,
        currentYear,
        currentSemester,
      })

    } catch (err) {
      const error = {
        type: 'errorMsg',
        message: err.message,
        url: '/hoc-sinh'
      }

      next(error)
    }
  }

  const getStudentAdd = (req, res) => {
    res.render('student/add', {
      documentTitle: 'Tiếp nhận học sinh',
    })
  }

  const postStudentAdd = async (req, res, next) => {
    try {
      if (
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.dob ||
        !req.body.gender ||
        !req.body.address ||
        !req.body.parentName ||
        !req.body.parentPhone
      ) {
        const error = {
          type: 'formMsg',
          message: 'Vui lòng nhập đầy đủ thông tin',
          url: '/hoc-sinh/tiep-nhan-hoc-sinh'
        }

        next(error)
      }

      const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        gender: Number(req.body.gender),
        address: req.body.address,
        parentName: req.body.parentName,
        parentPhone: req.body.parentPhone,
      }

      const checkAge = await checkStudentAge(student.dob)

      if (checkAge) {
        const result = await addStudent(student)

        req.flash('successMsg', `Tiếp nhận học sinh ${result.id} thành công`)
        return res.redirect('/hoc-sinh')
      }

      const ruleList = await getRuleList()
      const error = {
        type: 'formMsg',
        message: `Tuổi học sinh từ ${ruleList.minAge} đến ${ruleList.maxAge} tuổi`,
        url: '/hoc-sinh/tiep-nhan-hoc-sinh'
      }
      next(error)

    } catch (err) {
      const error = {
        type: 'errorMsg',
        message: err.message,
        url: '/hoc-sinh/tiep-nhan-hoc-sinh'
      }
      next(error)
    }
  }

  const getStudentUpdate = async (req, res, next) => {
    const { id } = req.params

    try {
      const student = await getStudentById(id)

      if (!student) {
        const error = {
          type: 'errorMsg',
          message: `Không tìm thấy học sinh ${id}`,
          url: '/hoc-sinh'
        }
        next(error)
      }

      return res.render('student/update', {
        documentTitle: 'Cập nhật học sinh',
        student,
      })

    } catch (err) {
      const error = {
        type: 'errorMsg',
        message: err.message,
        url: '/hoc-sinh'
      }
      next(error)
    }
  }

  const putStudentUpdate = async (req, res, next) => {
    const { id } = req.params

    try {
      if (
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.dob ||
        !req.body.gender ||
        !req.body.address ||
        !req.body.parentName ||
        !req.body.parentPhone
      ) {
        const error = {
          type: 'formMsg',
          message: 'Vui lòng nhập đầy đủ thông tin',
          url: `/hoc-sinh/cap-nhat-hoc-sinh/${id}`
        }
        next(error)
      }

      const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        gender: Number(req.body.gender),
        address: req.body.address,
        parentName: req.body.parentName,
        parentPhone: req.body.parentPhone,
      }

      const checkAge = await checkStudentAge(student.dob)

      if (checkAge) {
        const result = await updateStudent(id, student)
        req.flash('successMsg', `Cập nhật học sinh ${result.id} thành công`)
        return res.redirect(`/hoc-sinh/cap-nhat-hoc-sinh/${id}`)
      }

      const ruleList = await getRuleList()
      const error = {
        type: 'formMsg',
        message: `Tuổi học sinh từ ${ruleList.minAge} đến ${ruleList.maxAge} tuổi`,
        url: `/hoc-sinh/cap-nhat-hoc-sinh/${id}`
      }
      next(error)

    } catch (err) {
      const error = {
        type: 'errorMsg',
        message: err.message,
        url: `/hoc-sinh/cap-nhat-hoc-sinh/${id}`
      }
      next(error)
    }
  }

  const getStudentResult = async (req, res) => {
    res.render('student/result', {
      documentTitle: 'Kết quả học tập',
    })
  }

  const getStudentSearch = async (req, res, next) => {
    const { info, type } = req.query

    try {
      const currentYear = await getCurrentYear()
      const currentSemester = await getCurrentSemester()
      const students = await getStudentBySearch(info, type)

      res.render('student/home', {
        documentTitle: 'Quản lý học sinh',
        currentYear,
        currentSemester,
        students,
      })

    } catch (err) {
      const error = {
        type: 'errorMsg',
        message: err.message,
        url: '/hoc-sinh'
      }
      next(error)
    }
  }

  const deleteStudentDelete = async (req, res, next) => {
    const { id } = req.params

    try {
      const result = await deleteStudent(id)
      
      req.flash('successMsg', `Xóa thành công học sinh ${id}`)
      return res.redirect('/hoc-sinh')
      
    } catch (err) {
      const error = {
        type: 'errorMsg',
        message: err.message,
        url: '/hoc-sinh'
      }
      
      next(error)
    }
  }

  return {
    getStudentDashboard,
    getStudentAdd,
    postStudentAdd,
    getStudentUpdate,
    getStudentResult,
    putStudentUpdate,
    deleteStudentDelete,
    getStudentSearch,
  }
}

module.exports = studentController
