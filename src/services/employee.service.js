const { Op } = require('sequelize')
const { Employee } = require('../models')
const customError = require('../utils/customError')

const accountService = require('./account.service')

const getEmployeeById = async (id) => {
  try {
    const result = await Employee.findByPk(id)

    return result
    
  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

const getEmployeeByAccount = async (accountId) => {
  try {
    const account = await accountService.getAccountById(accountId)
    if(!account) throw customError(1, `Không tìm thấy tài khoản ${id}`)

    const result = await Employee.findOne({
      where: { accountId: { [Op.eq]: account.id } }
    })

    return result

  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

exports.getEmployeeById = getEmployeeById
exports.getEmployeeByAccount = getEmployeeByAccount
