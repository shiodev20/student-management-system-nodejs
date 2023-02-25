const { Op } = require('sequelize')
const { Year } = require('../models')

function yearService() {

  const getYearList = async () => {
    try {
      const result = await Year.findAll()
      return result
    } catch (error) {
      throw new Error('Lỗi hệ thống')
    }
  }

  const getCurrentYear = async () => {
    try {
      const result = await Year.findOne({
        where: { status: { [Op.eq]: 1 } }
      })
  
      return result
    } catch (error) {
      throw new Error('Lỗi hệ thống')
    }
  }

  return {
    getYearList,
    getCurrentYear,
  }
}

module.exports = yearService
