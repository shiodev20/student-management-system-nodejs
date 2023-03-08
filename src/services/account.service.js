const { Account, Role, Teacher, Employee } = require('../models')
const customError = require('../utils/customError')

function accountService() {

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
      const account = await Account.findByPk(id)
      if(!account) throw customError(1, `Không tìm thấy tài khoản ${id}`)

      return account

    } catch (error) {
      if(error.code != 0) throw error
      throw customError()
    }
  }

  const updateAccount = async (account) => {
    try {
      
    } catch (error) {
      if(error.code != 0) throw error
      throw customError()
    }
  }

  return {
    getAccountList,
    getAccountById,
    updateAccount,
  }
}

module.exports = accountService
