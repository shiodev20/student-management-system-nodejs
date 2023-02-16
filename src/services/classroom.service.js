const { Op } = require('sequelize')
const { Classroom, Teacher } = require('../models')
const { generateClassroomId } = require('../helpers/generateId.helper')

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
      throw new Error('Lỗi hệ thống')
    }
  }
  
  const addClassroom = async (classroom) => {
    try {
      const classroomId = generateClassroomId(classroom.yearId, classroom.name)
      const isContainClassroom = await Classroom.findByPk(classroomId)

      if(isContainClassroom) throw new Error('Lớp học đã tồn tại')

      const result = await Classroom.create({
        id: classroomId,
        ...classroom,
      })

      return result
    } catch (error) {
      throw new Error(error.message)
    }
  }


  return {
    getClassroomByYear,
    addClassroom,
  }
}

module.exports = classroomService