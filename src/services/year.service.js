const { Op } = require('sequelize')
const { Year } = require('../models')
const customError = require('../utils/customError')

function yearService() {

  const getYearList = async () => {
    try {
      const result = await Year.findAll()
      return result
    } catch (error) {
      throw customError()
    }
  }

  const getCurrentYear = async () => {
    try {
      const result = await Year.findOne({
        where: { status: { [Op.eq]: 1 } }
      })
  
      return result
    } catch (error) {
      throw customError()
    }
  }

  return {
    getYearList,
    getCurrentYear,
  }
}

module.exports = yearService
