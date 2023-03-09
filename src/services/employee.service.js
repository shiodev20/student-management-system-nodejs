const { Op } = require('sequelize')
const { Employee } = require('../models')
const customError = require('../utils/customError')

const accountService = require('./account.service')

const getEmployeeById = async (id) => {
  try {
    const result = await Employee.findByPk(id)
    if(!result) throw customError(1, `Không tìm thấy nhân viên ${id}`)

    return result
    
  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

const getEmployeeByAccount = async (accountId) => {
  try {
    const account = await accountService.getAccountById(accountId)

    const result = await Employee.findOne({
      where: { accountId: { [Op.eq]: account.id } }
    })
    if(!result) throw customError(1, `Không tìm thấy nhân viên`)

    return result

  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

exports.getEmployeeById = getEmployeeById
exports.getEmployeeByAccount = getEmployeeByAccount
