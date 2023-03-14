const { Op } = require('sequelize')
const { Semester } = require('../models')
const customError = require('../utils/customError')


const getSemesterList = async () => {
  try {
    const result = await Semester.findAll()

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const getSemesterById = async (id) => {
  try {
    const result = await Semester.findByPk(id)

    return result

  } catch (error) {
    if (error.code != 0) throw error
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
    if (error.code != 0) throw error
    throw customError()
  }
}

exports.getSemesterList = getSemesterList
exports.getSemesterById = getSemesterById
exports.getCurrentSemester = getCurrentSemester
