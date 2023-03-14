const { 
  studentService, 
  yearService, 
  semesterService, 
  ruleService, 
  markService, 
  classroomService,
  markTypeService,
} = require('../services')
const customError = require('../utils/customError')


const err = { type: '', message: '', url: '' }


const getStudentDashboard = async (req, res, next) => {
  try {
    const currentYear = await yearService.getCurrentYear()
    const currentSemester = await semesterService.getCurrentSemester()
    const students = await studentService.getStudentList()

    res.render('student/home', {
      documentTitle: 'Quản lý học sinh',
      students,
      currentYear,
      currentSemester,
    })

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/hoc-sinh'
        break;
    }

    next(err)
  }
}

const getStudentAdd = (req, res, next) => {
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
      throw customError(2, 'Vui lòng nhập đầy đủ thông tin')
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

    const checkAge = await ruleService.checkStudentAge(student.dob)

    if (!checkAge) {
      const ruleList = await ruleService.getRuleList()
      throw customError(2, `Tuổi học sinh từ ${ruleList.minAge} đến ${ruleList.maxAge} tuổi`)
    }

    const result = await studentService.addStudent(student)

    req.flash('successMsg', `Tiếp nhận học sinh ${result.id} thành công`)
    return res.redirect('/hoc-sinh')

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/hoc-sinh/tiep-nhan-hoc-sinh'
        break;
      case 2:
        err.type = 'formMsg'
        err.message = error.message
        err.url = '/hoc-sinh/tiep-nhan-hoc-sinh'
        break;
    }

    next(err)
  }
}

const getStudentUpdate = async (req, res, next) => {
  const { id } = req.params

  try {
    const student = await studentService.getStudentById(id)

    return res.render('student/update', {
      documentTitle: 'Cập nhật học sinh',
      student,
    })

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/hoc-sinh'
        break;
    }

    next(err)
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
      throw customError(2, 'Vui lòng nhập đầy đủ thông tin')
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

    const checkAge = await ruleService.checkStudentAge(student.dob)

    if (!checkAge) {
      const ruleList = await ruleService.getRuleList()
      throw customError(2, `Tuổi học sinh từ ${ruleList.minAge} đến ${ruleList.maxAge} tuổi`)
    }

    const result = await studentService.updateStudent(id, student)

    req.flash('successMsg', `Cập nhật học sinh ${result.id} thành công`)
    return res.redirect(`/hoc-sinh/cap-nhat-hoc-sinh/${id}`)

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/hoc-sinh/cap-nhat-hoc-sinh/${id}`
        break;
      case 2:
        err.type = 'formMsg'
        err.message = error.message
        err.url = `/hoc-sinh/cap-nhat-hoc-sinh/${id}`
        break;
    }

    next(err)
  }
}

const getStudentResult = async (req, res, next) => {
  const { id } = req.params
  const { year, semester } = req.query

  try {
    const years = await yearService.getYearList()
    const semesters = await semesterService.getSemesterList()
    const markTypes = await markTypeService.getMarkTypeList()
    const student = await studentService.getStudentById(id)
    const classroom = await classroomService.getClassroomByStudent(id, year)
    const studentResult = await markService.getMarksOfStudent(id, year, semester)

    // return res.json(studentResult)

    res.render('student/result', {
      documentTitle: 'Kết quả học tập',
      selectedYear: year,
      selectedSemester: semester,
      years,
      semesters,
      markTypes,
      student,
      classroom,
      studentResult,
    })

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `hoc-sinh/ket-qua-hoc-tap/${id}`
        break;
    }

    next(err)
  }
}

const getStudentSearch = async (req, res, next) => {
  const { info, type } = req.query

  try {
    const currentYear = await yearService.getCurrentYear()
    const currentSemester = await semesterService.getCurrentSemester()
    const students = await studentService.getStudentBySearch(info, type)

    res.render('student/home', {
      documentTitle: 'Quản lý học sinh',
      currentYear,
      currentSemester,
      students,
    })

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/hoc-sinh`
        break;
    }

    next(err)
  }
}

const deleteStudentDelete = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await studentService.deleteStudent(id)

    req.flash('successMsg', `Xóa thành công học sinh ${id}`)
    return res.redirect('/hoc-sinh')

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/hoc-sinh`
        break;
    }

    next(err)
  }
}

module.exports = {
  getStudentDashboard,
  getStudentAdd,
  postStudentAdd,
  getStudentUpdate,
  getStudentResult,
  putStudentUpdate,
  deleteStudentDelete,
  getStudentSearch,
}
