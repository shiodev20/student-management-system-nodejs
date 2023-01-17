const { Op } = require('sequelize')
const { Year } = require('../models')
const errorHelper = require('../helpers/error.helper')

function yearService() {

  const getCurrentYear = async () => {
    try {
      const result = await Year.findOne({
        where: { status: { [Op.eq]: 1 } }
      })
  
      return result
    } catch (error) {
      throw errorHelper('Lỗi hệ thống')
    }
  }

  return {
    getCurrentYear,
  }
}

module.exports = yearService
