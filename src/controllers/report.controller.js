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
      queryData: null,
    })

  } catch (error) {
    console.log(error);
  }
}

const getReportClassroomSubject = async (req, res, next) => {
  const { year, semester, subject, classroom } = req.query
  try {
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
      queryData: req.query,
    })
  } catch (error) {
    console.log(error);
  }

}

const getReportSubject = async (req, res, next) => {
  const { year, semester, subject } = req.query

  try {
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
      queryData: req.query,
    })
  } catch (error) {
    console.log(error);
  }
}

const getReportSemeter = async (req, res, next) => {
  
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
      markTypes: null,
      studentMarks: null,
      queryData: req.query,
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getReportDashboard,
  getReportClassroomSubject,
  getReportSubject,
  getReportSemeter
}

