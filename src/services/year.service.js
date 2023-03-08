const { Op } = require('sequelize')
const { Year } = require('../models')
const customError = require('../utils/customError')

const getYearList = async () => {
  try {
    const result = await Year.findAll()
    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const getYearById = async (id) => {
  try {
    const result = await Year.findByPk(id)
    if (!result) throw customError(1, `Không tìm thấy năm học ${id}`)

    return result

  } catch (error) {
    if (error.code != 0) throw error
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
    if (error.code != 0) throw error
    throw customError()
  }
}

exports.getYearList = getYearList
exports.getYearById = getYearById
exports.getCurrentYear = getCurrentYear
