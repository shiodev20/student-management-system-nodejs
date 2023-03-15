const { Op } = require('sequelize')
const { Mark, Classroom, Student, Subject, MarkType } = require('../models')
const customError = require('../utils/customError')

const yearService = require('./year.service')
const semesterService = require('./semester.service')
const subjectService = require('./subject.service')
const classroomService = require('./classroom.service')
const studentService = require('./student.service')
const markTypeService = require('./markType.service')


const getMarksOfClassroomBySubject = async (classroomId, subjectId, semesterId, yearId = null) => {

  try {
    const semester = await semesterService.getSemesterById(semesterId)
    if(!semester) throw customError(1, `Không tìm thấy học kỳ ${semesterId}`)

    const classroom = await classroomService.getClassroomById(classroomId)
    if(!classroom) throw customError(1, `Không tìm thấy lớp học ${classroomId}`)

    const subject = await subjectService.getSubjectById(subjectId)
    if(!subject) throw customError(1, `Không tìm thấy môn học ${subjectId}`)

    const result = await Student.findAll({
      include: [
        {
          model: Classroom,
          as: 'classrooms',
          through: { attributes: [] },
          attributes: [],
          where: {
            id: classroom.id,
            yearId: yearId ? yearId : classroom.yearId
          }
        },
        {
          model: Mark,
          as: 'marks',
          where: {
            semesterId: semester.id,
            subjectId: subject.id,
          }
        }
      ]
    })

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const getMarksOfStudent = async (studentId, yearId, semesterId) => {
  try {
    const student = await studentService.getStudentById(studentId)
    if(!student) throw customError(1, `Không tìm thấy học sinh ${studentId}`)
    
    const year = await yearService.getYearById(yearId)
    if(!year) throw customError(1, `Không tìm thấy năm học ${yearId}`)

    const semester = await semesterService.getSemesterById(semesterId)
    if(!semester) throw customError(1, `Không tìm thấy học kỳ ${semesterId}`)

    const studentResult = await Subject.findAll({
      include: {
        model: Mark,
        as: 'marks',
        where: {
          [Op.and]: [
            { yearId: { [Op.eq]: year.id } },
            { semesterId: { [Op.eq]: semester.id } },
            { studentId: { [Op.eq]: student.id } },
          ]
        }
      }
    })


    return studentResult

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const addMarks = async (data) => {
  try {
    const result = await Promise.all(data.map(async item => {
      const mark = await Mark.findOne({
        where: {
          [Op.and]: [
            { yearId: { [Op.eq]: item.yearId } },
            { semesterId: { [Op.eq]: item.semesterId } },
            { classroomId: { [Op.eq]: item.classroomId } },
            { subjectId: { [Op.eq]: item.subjectId } },
            { studentId: { [Op.eq]: item.studentId } },
            { markTypeId: { [Op.eq]: item.markTypeId } },
          ]
        }
      })

      if (item.mark < 0) throw customError(1, 'Điểm không được bé hơn 0')

      if (mark.mark != item.mark) await mark.update({ mark: item.mark })
    }))

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const updateAvgMark = async (yearId, semesterId, classroomId, subjectId) => {
  try {
    const year = await yearService.getYearById(yearId)
    if(!year) throw customError(1, `Không tìm thấy năm học ${yearId}`)

    const semester = await semesterService.getSemesterById(semesterId)
    if(!semester) throw customError(1, `Không tìm thấy học kỳ ${semesterId}`)

    const classroom = await classroomService.getClassroomById(classroomId)
    if(!classroom) throw customError(1, `Không tìm thấy lớp học ${classroomId}`)

    const subject = await subjectService.getSubjectById(subjectId)
    if(!subject) throw customError(1, `Không tìm thấy môn học ${subjectId}`)

    const markTypes = await markTypeService.getMarkTypeList()

    const sumOfCoefficient = markTypes.reduce((total, item) => total + item.coefficient, 0)

    const studentMarks = await Student.findAll({
      include: [
        {
          model: Classroom,
          as: 'classrooms',
          through: { attributes: [] },
          attributes: [],
          where: {
            id: classroom.id
          }
        },
        {
          model: Mark,
          as: 'marks',
          where: {
            semesterId: semester.id,
            subjectId: subject.id,
          },
          include: {
            model: MarkType,
            as: 'markType'
          }
        }
      ]
    })

    const result = await Promise.all(studentMarks.map(async student => {
      let sumOfMark = 0

      student.marks.forEach(mark => {
        sumOfMark += Number(mark.mark) * mark.markType.coefficient
      })

      const avgMark = sumOfMark / sumOfCoefficient

      const mark = await Mark.findOne({
        where: {
          [Op.and]: [
            { yearId: { [Op.eq]: year.id } },
            { semesterId: { [Op.eq]: semester.id } },
            { classroomId: { [Op.eq]: classroom.id } },
            { subjectId: { [Op.eq]: subject.id } },
            { studentId: { [Op.eq]: student.id } },
            { markTypeId: { [Op.eq]: markTypes[markTypes.length - 1].id } },
          ]
        }
      })

      await mark.update({ mark: avgMark })
    }))

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const updateAvgSemester = async (yearId, semesterId, classroomId, studentId) => {
  try {
    const subjects = await subjectService.getSubjectList()
    const markTypes = await markTypeService.getMarkTypeList()

    let sumOfCoefficient = 0
    let avg = 0

    for (const subject of subjects) {
      const studentMark = await Mark.findOne({
        where: {
          [Op.and]: [
            { yearId: { [Op.eq]: yearId }},
            { semesterId: { [Op.eq]: semesterId }},
            { classroomId: { [Op.eq]: classroomId }},
            { studentId: { [Op.eq]: studentId }},
            { subjectId: { [Op.eq]: subject.id }},
            { markTypeId: { [Op.eq]: markTypes[markTypes.length - 1].id } }
          ]
        }
      })

      console.log(studentMark.mark);

      sumOfCoefficient += subject.coefficient
      avg += Number(studentMark.mark)
    }


    const avgSemeter = (avg / sumOfCoefficient).toFixed(1)

    return {
      avg,
      sumOfCoefficient,
      avgSemeter,
    }


  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

exports.getMarksOfClassroomBySubject = getMarksOfClassroomBySubject
exports.getMarksOfStudent = getMarksOfStudent
exports.addMarks = addMarks
exports.updateAvgMark = updateAvgMark
exports.updateAvgSemester = updateAvgSemester
