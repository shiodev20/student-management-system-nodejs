const { Op } = require('sequelize')
const { Semester } = require('../models')

function SemesterService() {

  const getCurrentSemester = async () => {
    try {
      const result = await Semester.findOne({
        where: { status: { [Op.eq]: 1 } }
      })
  
      return result
    } catch (error) {
      console.log(error);
      throw new Error('Lỗi hệ thống')
    }
  }

  return {
    getCurrentSemester,
  }
}

module.exports = SemesterService
