const { studentService, yearService, semesterService, ruleService } = require('../services')

function studentController() {

  const { getStudentList, getStudentById, getStudentBySearch, addStudent } = studentService()
  const { getCurrentYear } = yearService()
  const { getCurrentSemester } = semesterService()
  const { getRuleList, checkStudentAge } = ruleService()

  const getStudentDashboard = async (req, res) => {
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

    } catch (error) {
      req.flash('errorMsg', error.message)
      res.redirect('/hoc-sinh')
    }

  }

  const getStudentAdd = (req, res) => {
    res.render('student/add', {
      documentTitle: 'Tiếp nhận học sinh',
    })
  }

  const postStudentAdd = async (req, res) => {
    try {
      if(
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.dob ||
        !req.body.gender ||
        !req.body.address ||
        !req.body.parentName ||
        !req.body.parentPhone
      ) {
        req.flash('formMsg', 'Vui lòng nhập đầy đủ thông tin')
        return res.redirect('/hoc-sinh/tiep-nhan-hoc-sinh')
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

      if(checkAge) {
        const result = await addStudent(student)
  
        req.flash('successMsg', `Tiếp nhận học sinh ${result.id} thành công`)
        return res.redirect('/hoc-sinh')
      }
      
      const ruleList = await getRuleList()
      req.flash('formMsg', `Tuổi tiếp nhận từ ${ruleList.minAge} đến ${ruleList.maxAge} tuổi`)
      return res.redirect('/hoc-sinh/tiep-nhan-hoc-sinh')

    } catch (error) {
      req.flash('errorMsg', error.message)
      return res.redirect('/hoc-sinh/tiep-nhan-hoc-sinh')
    }
  }

  const getStudentUpdate = async (req, res) => {
    const { id } = req.params

    try {
      const student = await getStudentById(id)
      
      if(student) {
        return res.render('student/update', {
          documentTitle: 'Cập nhật học sinh',
          student,
        })
      }

      req.flash('errorMsg', `Không tìm thấy học sinh ${id}`)
      return res.redirect('/hoc-sinh')
    } catch (error) {
      req.flash('errorMsg', error.message)
      return res.redirect('/hoc-sinh')
    }
  }

  const putStudentUpdate = async (req, res) => {
  }

  const getStudentResult = async (req, res) => {
    res.render('student/result', {
      documentTitle: 'Kết quả học tập',

    })
  }

  const getStudentSearch = async (req, res) => {
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
    } catch (error) {
      req.flash('errorMsg', error.message)
      res.redirect('/hoc-sinh')
    }
  }

  const deleteStudentDelete = async (req, res) => {

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
