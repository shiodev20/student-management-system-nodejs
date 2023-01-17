const { Op } = require('sequelize')
const { Semester } = require('../models')
const errorHelper = require('../helpers/error.helper')

function SemesterService() {

  const getCurrentSemester = async () => {
    try {
      const result = await Semester.findOne({
        where: { status: { [Op.eq]: 1 } }
      })
  
      return result
    } catch (error) {
      throw errorHelper('Lỗi hệ thống')
    }
  }

  return {
    getCurrentSemester,
  }
}

module.exports = SemesterService
