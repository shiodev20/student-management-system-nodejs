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
    const role = await Role.findByPk(id)
    if (!role) throw customError(1, `Không tìm thấy quyền người dùng`)
    return role

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

exports.getRoleList = getRoleList
exports.getRoleById = getRoleById
