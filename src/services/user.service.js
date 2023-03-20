const { Teacher, Employee, Role } = require('../models')
const customError = require('../utils/customError')
const { generateId } = require('../utils/generateId')

const roleService = require('./role.service')

const getUserList = async () => {
  try {
    const employees = await Employee.findAll({
      include: {
        model: Role,
        as: 'role'
      }
    })

    const teachers = await Teacher.findAll({
      include: {
        model: Role,
        as: 'role'
      }
    })

    return [...employees, ...teachers]

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const addUser = async (user) => {
  try {
    const role = await roleService.getRoleById(user.role)
    if (!role) throw customError(1, `Không tim thấy chức vụ ${user.role}`)

    let result = null

    if (role.id == 'VT2') {
      const id = generateId('GV')

      result = await Teacher.create({
        id,
        ...user,
        roleId: role.id
      })

    } else {
      const id = generateId('NV')

      result = await Employee.create({
        id,
        ...user,
        roleId: role.id
      })
    }

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

exports.getUserList = getUserList
exports.addUser = addUser
