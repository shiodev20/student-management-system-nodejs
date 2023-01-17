const { Op } = require('sequelize')

const errorHelper = require('../helpers/error.helper')
const { Account, Employee, Teacher } = require('../models')

function authService() {

  const findAccountByUsername = async (username) => {
    try {
      const result = await Account.findOne({
        where: { username: { [Op.eq]: username } }
      })
  
      return result
    } catch (error) {
      throw errorHelper('Lỗi hệ thống')
    }
  }

  const getUserInfo = async (accountId) => {
    try {
      let user = await Employee.findOne({
        where: { accountId: { [Op.eq]: accountId } }
      })

      if (!user) {
        user = await Teacher.findOne({
          where: { accountId: { [Op.eq]: accountId } }
        })
      }

      const account = await Account.findByPk(accountId)

      const result = {
        id: user.id,
        fullName: user.fullName,
        role: account.roleId
      }

      return result
    } catch (error) {
      throw errorHelper('Lỗi hệ thống')
    }
  }

  return {
    findAccountByUsername,
    getUserInfo,
  }

}

module.exports = authService
