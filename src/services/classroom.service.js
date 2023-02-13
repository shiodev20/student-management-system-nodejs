const { Op } = require('sequelize')
const { Classroom, Teacher } = require('../models')

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

  return {
    getClassroomByYear,
  }
}

module.exports = classroomService