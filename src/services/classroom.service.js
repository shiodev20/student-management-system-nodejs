const { Op } = require('sequelize')
const { Classroom, Teacher } = require('../models')
const { generateClassroomId } = require('../utils/generateId')
const customError = require('../utils/customError')

function classroomService() {

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
  
  const addClassroom = async (classroom) => {
    try {
      const classroomId = generateClassroomId(classroom.yearId, classroom.name)
      const isContainClassroom = await Classroom.findByPk(classroomId)

      if(isContainClassroom) throw customError(1, 'Lớp học đã tồn tại')

      const result = await Classroom.create({
        id: classroomId,
        ...classroom,
      })

      return result
    } catch (error) {
      if(error.code != 0) throw error
      throw customError()
    }
  }


  return {
    getClassroomByYear,
    addClassroom,
  }
}

module.exports = classroomService