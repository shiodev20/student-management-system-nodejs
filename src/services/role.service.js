const { Role } = require('../models')
const customError = require('../utils/customError')


const getRoleList = async () => {
  try {
    const result = await Role.findAll()

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const getRoleById = async (id) => {
  try {
    const result = await Role.findByPk(id)
    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

exports.getRoleList = getRoleList
exports.getRoleById = getRoleById
