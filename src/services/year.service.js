const { Op } = require('sequelize')
const { Year } = require('../models')

function yearService() {

  const getCurrentYear = async () => {
    try {
      const result = await Year.findOne({
        where: { status: { [Op.eq]: 1 } }
      })
  
      return result
    } catch (error) {
      console.log(error);
      throw new Error('Lỗi hệ thống')
    }
  }

  return {
    getCurrentYear,
  }
}

module.exports = yearService
