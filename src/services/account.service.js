const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const { Account, Role, Teacher, Employee } = require('../models')
const customError = require('../utils/customError')

const roleService = require('./role.service')

const getAccountList = async () => {
  try {
    const result = await Account.findAll({
      include: [
        { 
          model: Teacher, 
          as: 'teacher',
          include: {
            model: Role,
            as: 'role'
          }
        },
        { 
          model: Employee, 
          as: 'employee',
          include: {
            model: Role,
            as: 'role',
          } 
        },
      ]
    })

    return result

  } catch (error) {
    console.log(error);
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

const getNoAccountEmplList = async () => {
  try {
    const teachers = await Teacher.findAll({
      where: { accountId: { [Op.eq]: null } },
      include: { model: Role, as: 'role' },
    })

    const employees = await Employee.findAll({
      where: { accountId: { [Op.eq]: null } },
      include: { model: Role, as: 'role' }
    })

    return [...teachers, ...employees]
      

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const addAccount = async ({ id, username, roleId }) => {
  try {
    const account = await Account.findByPk(id)
    if(account) throw customError(1, `Tài khoản ${id} đã tồn tại`)

    const hashPassword = await bcrypt.hash('qwerty', 10)

    let empl = await Teacher.findByPk(username)
    if(!empl) empl = await Employee.findByPk(username)

    const result = await Account.create({
      id,
      username,
      password: hashPassword,
    })

    await empl.update({
      accountId: result.id
    })

    return result

  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

const updateAccount = async ({ id, username, password, roleId }) => {
  try {
    const updateAccount = {}

    const account = await getAccountById(id)
    const role = await roleService.getRoleById(roleId)

    if (account.username.toLowerCase() !== username.toLowerCase()) throw customError(2, `Tên đăng nhập không trùng khớp`)

    updateAccount.id = account.id
    updateAccount.roleId = role.id
    updateAccount.username = account.username
    
    const isMatchPassword = password === account.password ? true : false

    if (!isMatchPassword)
    {
      const hashPassword = await bcrypt.hash(password, 10)
      updateAccount.password = hashPassword
    }

    const result = await account.update(updateAccount)

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const updateAccountStatus = async (id) => {
  try {
    const account = await getAccountById(id)

    const result = await account.update({ status: !account.status })

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

// const updateAccountRole = async (id, roleId) => {
//   try {
//     const account = await getAccountById(id)
//     const role = await roleService.getRoleById(roleId)

//     const result = await account.update({ roleId: role.id })

//     return result

//   } catch (error) {
//     if(error.code != 0) throw error
//     throw customError()
//   }
// }

const resetAccountPassword = async (id) => {
  try {
    const account = await getAccountById(id)
    const hashPassword = await bcrypt.hash('123456', 10)

    const result = await account.update({ password: hashPassword })

    return result

  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

const deleteAccount = async (id) => {
  try {
    const account = await getAccountById(id)

    let empl = await Employee.findOne({ where: { accountId: { [Op.eq]: account.id } } })
    if(!empl) empl = await Teacher.findOne({ where: { accountId: { [Op.eq]: account.id } } })
    
    await empl.update({ accountId: null })

    const result = await account.destroy()

    return result

  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

exports.getAccountList = getAccountList
exports.getAccountById = getAccountById
exports.getAccountByUsername = getAccountByUsername
exports.getNoAccountEmplList = getNoAccountEmplList
exports.addAccount = addAccount
exports.updateAccount = updateAccount
exports.updateAccountStatus = updateAccountStatus
// exports.updateAccountRole = updateAccountRole
exports.resetPassword = resetAccountPassword
exports.deleteAccount = deleteAccount
