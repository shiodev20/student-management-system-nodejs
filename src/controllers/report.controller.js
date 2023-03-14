const {
  yearService,
  semesterService,
  classroomService,
  subjectService,
  markService,
  markTypeService,
} = require('../services')
const customError = require('../utils/customError')


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
      markTypes: null,
      studentMarks: null,
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

    const studentMarks = await markService.getMarksOfClassroomBySubject(classroom, subject, semester, year)

    // return res.json(studentMarks)

    res.render('report/home', {
      documentTitle: 'Báo cáo thống kê',
      years,
      semesters,
      subjects,
      classrooms,
      markTypes,
      studentMarks,
      queryData: req.query,
    })
  } catch (error) {
    console.log(error);
  }

}

const getReportSubject = async (req, res, next) => {
  const { tag } = req.query
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
      tag,
    })
  } catch (error) {
    console.log(error);
  }
}

const getReportSemeter = async (req, res, next) => {
  const { tag } = req.query
  
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
      tag,
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

