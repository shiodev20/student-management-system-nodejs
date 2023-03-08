const {
  yearService,
  semesterService,
  classroomService,
  subjectService,
  markTypeService,
  markService,
} = require('../services')
const customError = require('../utils/customError')

function markController() {

  const { getCurrentYear } = yearService()
  const { getCurrentSemester } = semesterService()
  const { getClassroomById } = classroomService()
  const { getSubjectByTeacher } = subjectService()
  const { getMarkTypeList } = markTypeService()
  const { getMarksOfClassroomBySubject, addMarks, updateAvgMark } = markService()

  const err = { type: '', message: '', url: '' }

  const getMarkAdd = async (req, res, next) => {
    const { id } = req.params

    try {
      const currentYear = await getCurrentYear()
      const currentSemester = await getCurrentSemester()
      const classroom = await getClassroomById(id)
      const subject = await getSubjectByTeacher(req.session.user.id)
      const markTypes = await getMarkTypeList()


      const studentMarks = await getMarksOfClassroomBySubject(classroom.id, currentSemester.id, subject.id)

      res.render('mark/add', {
        documentTitle: 'Nhập điểm',
        currentYear,
        currentSemester,
        classroom,
        subject,
        markTypes,
        studentMarks,
      })

    } catch (error) {
      switch (error.code) {
        case 0:
          err.type = 'errorMsg'
          err.message = error.message
          err.url = `/lop-hoc/${classroomId}`
          break;
        case 1:
          err.type = 'errorMsg'
          err.message = error.message
          err.url = `/lop-hoc/${classroomId}`
          break;
      }

      next(err)
    }
  }

  const postMarkAdd = async (req, res, next) => {
    let { studentIds, LD1, LD2, LD3, LD4, ...partials } = req.body

    try {
      studentIds = !Array.isArray(studentIds) ? [studentIds] : studentIds

      const markTypes = await getMarkTypeList()

      const data = []

      markTypes.forEach(markType => {
        if (markType.id === markTypes[markTypes.length - 1].id) return

        let markTypeOfInput = []

        for (const key in req.body) {
          if (key === markType.id) markTypeOfInput = !Array.isArray(req.body[key]) ? [req.body[key]] : req.body[key]
        }

        studentIds.forEach((studentId, idx) => {
          const formatMark = Math.round(markTypeOfInput[idx] * 10) / 10 

          if(formatMark < 0) throw customError(1, 'Điểm nhập không được bé hơn 0')

          const temp = { ...partials }

          temp.studentId = studentId
          temp.markTypeId = markType.id
          temp.mark = formatMark

          data.push(temp)
        })
      })

      const result = await addMarks(data)

      req.flash('successMsg', `Nhập điểm lớp ${partials.classroomId} thành công`)
      res.redirect(`/diem/nhap-diem/${partials.classroomId}`)

    } catch (error) {
      switch (error.code) {
        case 0:
          err.type = 'errorMsg'
          err.message = error.message
          err.url = `/diem/nhap-diem/${partials.classroomId}`
          break;
        case 1:
          err.type = 'errorMsg'
          err.message = error.message
          err.url = `/diem/nhap-diem/${partials.classroomId}`
          break;
      }

      next(err)
    }

  }

  const getMarkAvgCalculate = async (req, res, next) => {
    const { id } = req.params
    const { year, semester, subject } = req.query

    try {
      const result = await updateAvgMark(year, semester, id, subject)

      req.flash('successMsg', `Tính điểm trung bình lớp ${id} thành công`)
      res.redirect(`/diem/nhap-diem/${id}`)

    } catch (error) {
      console.log(error);
    }
  }

  return {
    getMarkAdd,
    getMarkAvgCalculate,
    postMarkAdd,
  }
}

module.exports = markController
