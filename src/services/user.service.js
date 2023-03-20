const { Teacher, Employee , Role } = require('../models')
const customError = require('../utils/customError')

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
    if(error.code != 0) throw error
    throw customError()
  }
}

exports.getUserList = getUserList
