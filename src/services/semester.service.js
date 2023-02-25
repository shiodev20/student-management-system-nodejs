const { Op } = require('sequelize')
const { Semester } = require('../models')
const customError = require('../utils/customError')

function SemesterService() {

  const getCurrentSemester = async () => {
    try {
      const result = await Semester.findOne({
        where: { status: { [Op.eq]: 1 } }
      })
  
      return result
    } catch (error) {
      throw customError()
    }
  }

  return {
    getCurrentSemester,
  }
}

module.exports = SemesterService
