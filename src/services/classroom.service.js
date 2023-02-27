const { Op } = require('sequelize')
const { Classroom, Teacher, TeachingAssignment, Subject } = require('../models')
const { generateClassroomId } = require('../utils/generateId')
const customError = require('../utils/customError')

function classroomService() {

  const getClassroomById = async (id) => {
    
    try {
      const result = await Classroom.findOne({
        where: { id: { [Op.eq]: id } },
        include: {
          model: Teacher,
          as: 'headTeacher',
        },
      })
      
      return result
    } catch (error) {
      if(error.code != 0) throw error
      throw customError()
    }
  }

  const getClassroomByYear = async (yearId) => {
    try {
      const result = await Classroom.findAll({
        where: { yearId: { [Op.eq]: yearId } },
        include: {
          model: Teacher,
          as: 'headTeacher',
        },
      })
      return result
    } catch (error) {
      throw customError()
    }
  }
  
  const getSubjectTeacherByClassroom = async (classroomId) => {
    try {
      const classroom = await Classroom.findByPk(classroomId)

      if(!classroom) throw customError(1, `Không tìm thấy lớp ${classroomId}`)

      const result = []

      const teachingAssignments = await classroom.getTeachingAssignments()

      await Promise.all(teachingAssignments.map(async item => {
        const subject = await item.getSubject()
        const subjectTeacher = await item.getSubjectTeacher()

        result.push([subject, subjectTeacher])
      }))

      result.sort((a, b) => {
        return Number(a[0].id.slice(-1)) - Number(b[0].id.slice(-1))
      })
      
      return result
    } catch (error) {
      if(error.code != 0) throw error
      throw customError()
    }
  }

  const addClassroom = async (classroom) => {
    try {
      const classroomId = generateClassroomId(classroom.yearId, classroom.name)
      const isContainClassroom = await Classroom.findByPk(classroomId)

      if(isContainClassroom) throw customError(1, 'Lớp học đã tồn tại')

      const result = await Classroom.create({
        id: classroomId,
        ...classroom,
      })

      const subjects = await Subject.findAll()

      await Promise.all(subjects.map(async subject => {
        await TeachingAssignment.create({
          classroomId: result.id,
          subjectId: subject.id,
          subjectTeacherId: null,
        })
      }))

      return result
    } catch (error) {
      if(error.code != 0) throw error
      throw customError()
    }
  }

  const addHeadTeacherToClassroom = async (classroomId, headTeacherId) => {
    try {
      const classroom = await Classroom.findByPk(classroomId)

      if(!classroom) throw customError(1, 'Không tìm lấy lớp học')

      const result = await classroom.update({ headTeacherId })

      return result
    } catch (error) {
      if(error.code != 0) throw error
      throw customError()
    }
  }

  return {
    getClassroomById,
    getClassroomByYear,
    getSubjectTeacherByClassroom,
    addClassroom,
    addHeadTeacherToClassroom,
  }
}

module.exports = classroomService