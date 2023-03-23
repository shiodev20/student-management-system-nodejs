const { Op } = require('sequelize')
const { Teacher, Employee, Role, Classroom, TeachingAssignment } = require('../models')
const customError = require('../utils/customError')
const { generateId } = require('../utils/generateId')

const roleService = require('./role.service')
const employeeService = require('./employee.service')
const teacherService = require('./teacher.service')
const yearService = require('./year.service')

const getUserList = async () => {
  try {
    const employees = await Employee.findAll({
      where: {
        status: { [Op.eq]: true },
      },
      include: {
        model: Role,
        as: 'role'
      }
    })

    const teachers = await Teacher.findAll({
      where: {
        status: { [Op.eq]: true },
      },
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

const getUserById = async (id) => {
  try {
    let result = await employeeService.getEmployeeById(id)
    if(!result) result = await teacherService.getTeacherById(id)

    return result

  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

const getUserBySearch = async (info, type) => {

  try {
    let result = null
    let employees = []
    let teachers = []

    switch (type) {
      // Search by id
      case '0':
        employees = await Employee.findAll({
          where: { id: { [Op.eq]: info } },
          include: {
            model: Role,
            as: 'role'
          }
        })
    
        teachers = await Teacher.findAll({
          where: { id: { [Op.eq]: info } },
          include: {
            model: Role,
            as: 'role'
          }
        })

        result = [...employees, ...teachers]

        break;
      
      // search by name
      case '1':
        employees = await Employee.findAll({
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
        })
    
        teachers = await Teacher.findAll({
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
        })

        result = [...employees, ...teachers]

        break;

      default:
        throw customError(1, `Loại tìm kiếm không phù hợp`)
    }

    return result

  } catch (error) {
    if(error.code != 0) throw error
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

const updateUser = async (id, user) => {
  try {
    const updateUser = await getUserById(id)
    if(!updateUser) throw customError(1, `Không tìm thấy nhân viên ${id}`)

    const result = await updateUser.update(user)

    return result
    
  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

const deleteUser = async (id) => {
  try {
    const user = await getUserById(id)
    if(!user) throw customError(1, `Không tìm thấy nhân viên ${id}`)

    const currentYear = await yearService.getCurrentYear()

    if(user.roleId == 'VT2') {
      const classrooms = await Classroom.findAll({
        where: {
          [Op.and]: [
            { yearId: { [Op.eq]: currentYear.id } },
            { headTeacherId: { [Op.eq]: user.id } }
          ]
        }
      })
      const teachingAssignments = await TeachingAssignment.findAll({
        where: {
          subjectTeacherId: { [Op.eq]: user.id }
        },
        include: {
          model: Classroom,
          as: 'classroom',
          where: {
            yearId: { [Op.eq]: currentYear.id }
          }
        }
      })

      await Promise.all(classrooms.map(async classroom => {
        await classroom.update({ headTeacherId: null })
      }))

      await Promise.all(teachingAssignments.map(async teachingAssignment => {
        await teachingAssignment.update({ subjectTeacherId: null })
      }))
    }

    const account = await user.getAccount()
    await account.update({ status: false })
    
    const result = await user.update({ status: false })

    return result

  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

exports.getUserList = getUserList
exports.getUserId = getUserById
exports.getUserBySearch = getUserBySearch
exports.addUser = addUser
exports.updateUser = updateUser
exports.deleteUser = deleteUser
