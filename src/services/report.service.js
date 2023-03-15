const { Op, fn, col } = require('sequelize')
const { Mark, Classroom } = require('../models')
const customError = require('../utils/customError')
const { getPercentage } = require('../utils/calculator')

const markService = require('./mark.service')
const markTypeService = require('./markType.service')

const getStudentMarkReport = async (classroomId, subjectId, semesterId, yearId) => {
  try {
    const result = await markService.getMarksOfClassroomBySubject(classroomId, subjectId, semesterId, yearId)

    return result

  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

const getSubjectReport = async (yearId, semesterId, subjectId) => {
  try {
    const markTypes = await markTypeService.getMarkTypeList()
    const passMark = 5.0

    const result = await Mark.findAll({
      attributes: [
        'classroom.id',
        'classroom.name',
        'classroom.size',
        'classroom.gradeId',
        [fn('COUNT', col('mark')), 'passQuantity']
      ],
      where: {
        [Op.and]: [
          { yearId: { [Op.eq]: yearId } },
          { semesterId: { [Op.eq]: semesterId } },
          { subjectId: { [Op.eq]: subjectId } },
          { markTypeId: { [Op.eq]: markTypes[markTypes.length - 1].id }},
          { mark: { [Op.gte]: passMark }},
        ]
      },
      group: ['classroom.id', 'classroom.name', 'classroom.size'],
      include: {
        model: Classroom,
        as: 'classroom',
        required: true,
      }
    })

    return result


  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

const getSemesterReport = async (yearId, semesterId) => {
  try {
    const passMark = 5.0

    const result = []

    const classrooms = await Classroom.findAll({
      where: {
        yearId: { [Op.eq]: yearId }
      }
    })

    for (const classroom of classrooms) {
      const students = await classroom.getStudents()
      
      const item = {
        id: classroom.id,
        name: classroom.name,
        size: classroom.size,
        gradeId: classroom.gradeId,
        passQuantity: 0,
        passRatio: null,
      }

      for (const student of students) {
        const studentAvgSemester = await markService.updateAvgSemester(yearId, semesterId, classroom.id, student.id)
        if(studentAvgSemester >= passMark) item.passQuantity += 1
      }
      
      item.passRatio = getPercentage(item.passQuantity, item.size)
      result.push(item)
    }

    return result

  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

exports.getStudentMarkReport = getStudentMarkReport
exports.getSubjectReport = getSubjectReport
exports.getSemesterReport = getSemesterReport
