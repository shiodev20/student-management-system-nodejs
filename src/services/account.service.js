const { Op } = require('sequelize')
const { Account, Role, Teacher, Employee } = require('../models')
const customError = require('../utils/customError')

const getAccountList = async () => {
  try {
    const result = await Account.findAll({
      include: [
        { model: Role, as: 'role' },
        { model: Teacher, as: 'teacher' },
        { model: Employee, as: 'employee' },
      ]
    })

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const getAccountById = async (id) => {
  try {
    const result = await Account.findByPk(id)
    if (!result) throw customError(1, `Không tìm thấy tài khoản ${id}`)

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const getAccountByUsername = async (username) => {
  try {
    const result = await Account.findOne({
      where: { username: { [Op.eq]: username } }
    })

    return result
  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const updateAccount = async (account) => {
  try {

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

exports.getAccountList = getAccountList
exports.getAccountById = getAccountById
exports.getAccountByUsername = getAccountByUsername
exports.updateAccount = updateAccount
