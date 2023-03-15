const {
  yearService,
  semesterService,
  classroomService,
  subjectService,
  markTypeService,
  reportService,
  gradeService,
} = require('../services')
const customError = require('../utils/customError')
const { getPercentage } = require('../utils/calculator')

const err = { type: '', message: '', url: ''}

const getReportDashboard = async (req, res, next) => {
  try {
    
    const years = await yearService.getYearList()
    const semesters = await semesterService.getSemesterList()
    const subjects = await subjectService.getSubjectList()
    const classrooms = await classroomService.getClassroomList()

    res.render('report/home', {
      documentTitle: 'Báo cáo thống kê',
      years,
      semesters,
      subjects,
      classrooms,
      grades: null,
      markTypes: null,
      studentMarks: null,
      subjectReport: null,
      queryData: req.query.tag ? req.query : null,
    })

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/bao-cao`
        break;
    }
  }
}

const getReportClassroomSubject = async (req, res, next) => {
  const { year, semester, subject, classroom } = req.query
  try {
    if(!year || !semester || !subject || !classroom) throw customError(1, `Vui lòng chọn đầy đủ thông tin`)

    const years = await yearService.getYearList()
    const semesters = await semesterService.getSemesterList()
    const subjects = await subjectService.getSubjectList()
    const classrooms = await classroomService.getClassroomList()
    const markTypes = await markTypeService.getMarkTypeList()

    const studentMarks = await reportService.getStudentMarkReport(classroom, subject, semester, year)

    res.render('report/home', {
      documentTitle: 'Báo cáo thống kê',
      years,
      semesters,
      subjects,
      classrooms,
      grades: null,
      markTypes,
      studentMarks,
      subjectReport: null,
      semesterReport: null,
      queryData: req.query,
    })

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/bao-cao?tag=1`
        break;
    }

    next(err)
  }

}

const getReportSubject = async (req, res, next) => {
  const { year, semester, subject } = req.query

  try {
    if(!year || !semester || !subject) throw customError(1, `Vui lòng chọn đầy đủ thông tin`)

    const years = await yearService.getYearList()
    const semesters = await semesterService.getSemesterList()
    const subjects = await subjectService.getSubjectList()
    const classrooms = await classroomService.getClassroomList()

    const grades = await gradeService.getGradeList()

    const data = await reportService.getSubjectReport(year, semester, subject)

    const subjectReport = {}

    grades.forEach(grade => {
      subjectReport[grade.id] = []

      data.forEach(item => {
        const temp = item.toJSON()
        if(temp.classroom.gradeId == grade.id) {
          subjectReport[grade.id].push({
            id: temp.classroom.id,
            name: temp.classroom.name,
            size: temp.classroom.size,
            passQuantity: temp.passQuantity,
            passRatio: getPercentage(temp.passQuantity, temp.classroom.size)
          })
        }
      })
    })

    res.render('report/home', {
      documentTitle: 'Báo cáo thống kê',
      years,
      semesters,
      subjects,
      classrooms,
      grades,
      markTypes: null,
      studentMarks: null,
      subjectReport,
      semesterReport: null,
      queryData: req.query,
    })

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/bao-cao?tag=2`
        break;
    }

    next(err)
  }
}

const getReportSemeter = async (req, res, next) => {
  const { year, semester } = req.query

  try {
    if(!year || !semester) throw customError(1, `Vui lòng chọn đầy đủ thông tin`)
    
    const years = await yearService.getYearList()
    const semesters = await semesterService.getSemesterList()
    const subjects = await subjectService.getSubjectList()
    const classrooms = await classroomService.getClassroomList()
    const grades = await gradeService.getGradeList()

    const data = await reportService.getSemesterReport(year, semester)

    const semesterReport = {}

    grades.forEach(grade => {
      semesterReport[grade.id] = []

      data.forEach(item => {
        if(item.gradeId == grade.id) {
          semesterReport[grade.id].push(item)
        }
      })
    })

    res.render('report/home', {
      documentTitle: 'Báo cáo thống kê',
      years,
      semesters,
      subjects,
      classrooms,
      grades,
      markTypes: null,
      studentMarks: null,
      subjectReport: null,
      semesterReport,
      queryData: req.query,
    })

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/bao-cao?tag=3`
        break;
    }

    next(err)
  }
}

module.exports = {
  getReportDashboard,
  getReportClassroomSubject,
  getReportSubject,
  getReportSemeter
}

