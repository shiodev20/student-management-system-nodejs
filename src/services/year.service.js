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

const updateYearStatus = async (id) => {
  try {
    const updateYear = await getYearById(id)
    if(!updateYear) throw customError(1, `Không tìm thấy năm học ${id}`)

    const currentYear = await getCurrentYear()

    let result = null

    if(updateYear.id !== currentYear.id) {
      await currentYear.update({ status: 0 })
      result = await updateYear.update({ status: 1 })
    }

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

exports.getYearList = getYearList
exports.getYearById = getYearById
exports.getCurrentYear = getCurrentYear
exports.updateYearStatus = updateYearStatus
