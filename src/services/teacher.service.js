const { Op } = require('sequelize')
const { Classroom, Teacher, Year, Subject } = require('../models')
const customError = require('../utils/customError')

function teacherService() {

  const getNoAssignmentHeadTeacherList = async () => {

    try {
      const assignedTeacherIds = []
      const currentYear = await Year.findOne({
        where: { status: { [Op.eq]: true } }
      })

      const assignedTeachers = await Classroom.findAll({
        attributes: ['headTeacherId'],
        where: {
          [Op.and]: [
            { headTeacherId: { [Op.ne]: null } },
            { yearId: { [Op.eq]: currentYear.id } }
          ]
        }
      })
  
      for (const item of assignedTeachers) assignedTeacherIds.push(item.headTeacherId)
      
      const result = await Teacher.findAll({
        where: { id: { [Op.notIn]: assignedTeacherIds } },
        include: {
          model: Subject,
          as: 'subject'
        }
      })

      return result

    } catch (error) {
      if(error.code != 0) throw error
      throw customError()
    }

  }

  const getTeachersBySubject = async (subjectId) => {
    try {
      const subject = await Subject.findByPk(subjectId)

      const result = await subject.getTeachers()

      return result
      
    } catch (error) {
      if(error.code != 0) throw error
      throw error
    }
  }

  return {
    getNoAssignmentHeadTeacherList,
    getTeachersBySubject
  }
}

module.exports = teacherService
