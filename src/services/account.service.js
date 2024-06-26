const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const { Account, Role, Teacher, Employee } = require('../models')
const customError = require('../utils/customError')

const teacherService = require('./teacher.service')
const employeeService = require('./employee.service')


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
    if (error.code != 0) throw error
    throw customError()
  }
}

const getAccountById = async (id) => {
  try {
    const result = await Account.findByPk(id)

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

const getAccountBySearch = async (info, type) => {
  try {
    let result = null

    switch (type) {
      // search by accountId
      case '0':
        result = await Account.findAll({
          where: { id: { [Op.eq]: info } },
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
        break;

      // search by employeeId (username)
      case '1':
        result = await Account.findAll({
          where: { username: { [Op.eq]: info } },
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
        break;

      // search by employee name
      case '2':
        result = await Account.findAll({
          include: [
            {
              model: Teacher,
              as: 'teacher',
              where: {
                [Op.or]: [
                  { firstName: { [Op.like]: `%${info}%` } },
                  { lastName: { [Op.like]: `%${info}%` } },
                ]
              },
              include: {
                model: Role,
                as: 'role'
              }
            },
            {
              model: Employee,
              as: 'employee',
              where: {
                [Op.or]: [
                  { firstName: { [Op.like]: `%${info}%` } },
                  { lastName: { [Op.like]: `%${info}%` } },
                ]
              },
              include: {
                model: Role,
                as: 'role',
              }
            },
          ]
        })
        break;
      default:
        throw customError(1, 'Loại tìm kiếm không phù hợp')
    }
    
    return result
    
  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const getNoAccountEmplListBySearch = async (info, type) => {
  try {
    let result = null
    let teachers = []
    let employees = []

    switch (type) {
      case '0':
        teachers = await Teacher.findAll({
          where: {
            [Op.and]: [
              { id: { [Op.eq]: info } },
              { accountId: { [Op.eq]: null } },
            ]
          },
          include: { model: Role, as: 'role' },
        })
    
        employees = await Employee.findAll({
          where: {
            [Op.and]: [
              { id: { [Op.eq]: info } },
              { accountId: { [Op.eq]: null } },
            ]
          },
          include: { model: Role, as: 'role' }
        })
    
        result = [...teachers, ...employees]
        break;

      case '1':
        teachers = await Teacher.findAll({
          where: {
            [Op.or]: [
              { firstName: { [Op.like]: `%${info}%` } },
              { lastName: { [Op.like]: `%${info}%` } },
            ]
          },
          include: { model: Role, as: 'role' },
        })
    
        employees = await Employee.findAll({
          where: {
            [Op.or]: [
              { firstName: { [Op.like]: `%${info}%` } },
              { lastName: { [Op.like]: `%${info}%` } },
            ]
          },
          include: { model: Role, as: 'role' }
        })
    
        result = [...teachers, ...employees]
        break;

      default:
        throw customError(1, 'Loại tìm kiếm không phù hợp')
    }

    return result

  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

const addAccount = async ({ id, username }) => {
  try {
    const account = await getAccountById(id)
    if (account) throw customError(1, `Tài khoản ${id} đã tồn tại`)

    let empl = await teacherService.getTeacherById(username)
    if (!empl) empl = await employeeService.getEmployeeById(username)

    if (!empl) throw customError(1, `Không tìm thấy nhân viên ${username}`)

    const hashPassword = await bcrypt.hash(process.env.DEFAULT_PASSWORD, parseInt(process.env.BCRYPT_SALT))
    
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
    if (error.code != 0) throw error
    throw customError()
  }
}

const updateAccountStatus = async (id) => {
  try {
    const account = await getAccountById(id)
    if (!account) throw customError(1, `Không tìm thấy tài khoản ${id}`)

    const result = await account.update({ status: !account.status })

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const resetAccountPassword = async (id) => {
  try {
    const account = await getAccountById(id)
    if (!account) throw customError(1, `Không tìm thấy nhân viên ${id}`)

    const hashPassword = await bcrypt.hash(process.env.DEFAULT_PASSWORD, parseInt(process.env.BCRYPT_SALT))

    const result = await account.update({ password: hashPassword })

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const forgotPassword = async (username, token, newPassword) => {
  try {
    const account = await getAccountByUsername(username)

    if(!account) throw customError()

    const isMatchPassword = token === account.password ? true : false

    if(!isMatchPassword) throw customError()

    const hashPassword = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_SALT))

    const result = await account.update({
      password: hashPassword
    })

    return result

  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

const deleteAccount = async (id) => {
  try {
    const account = await getAccountById(id)
    if (!account) throw customError(1, `Không tìm thấy nhân viên ${id}`)

    let empl = await Employee.findOne({ where: { accountId: { [Op.eq]: account.id } } })
    if (!empl) empl = await Teacher.findOne({ where: { accountId: { [Op.eq]: account.id } } })

    if (!empl) throw customError(1, `Không tìm thấy nhân viên ${username} của tài khoản ${id}`)

    await empl.update({ accountId: null })

    const result = await account.destroy()

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

exports.getAccountList = getAccountList
exports.getAccountById = getAccountById
exports.getAccountByUsername = getAccountByUsername
exports.getNoAccountEmplList = getNoAccountEmplList
exports.getAccountBySearch = getAccountBySearch
exports.getNoAccountEmplListBySearch = getNoAccountEmplListBySearch
exports.addAccount = addAccount
exports.updateAccountStatus = updateAccountStatus
exports.resetPassword = resetAccountPassword
exports.forgotPassword = forgotPassword
exports.deleteAccount = deleteAccount
