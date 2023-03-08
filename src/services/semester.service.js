const { Op } = require('sequelize')
const { Semester } = require('../models')
const customError = require('../utils/customError')

function SemesterService() {

  const getSemesterList = async () => {
    try {
      const result = await Semester.findAll()

      return result

    } catch (error) {
      if(error.code != 0) throw error
      throw customError()
    }
  }

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
    getSemesterList,
    getCurrentSemester,
  }
}

module.exports = SemesterService
