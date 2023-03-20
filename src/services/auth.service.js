const customError = require('../utils/customError')

const teacherService = require('./teacher.service')
const employeeService = require('./employee.service')

const getAuthInfo = async (accountId) => {
  try {
    let user = await employeeService.getEmployeeByAccount(accountId)
    if (!user) user = await teacherService.getTeacherByAccount(accountId)
    
    if(!user) throw customError(1, `Không tìm thấy nhân viên`)
    
    const result = {
      id: user.id,
      fullName: user.fullName,
      role: user.roleId
    }

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const getUserInfo = async (id) => {

  try {
    let user = await employeeService.getEmployeeById(id)
    if (!user) user = await teacherService.getTeacherById(id)

    if(!user) throw customError(1, `Không tìm thấy người dùng`)
  
    const role = await user.getRole()
  
    return { user, role }

  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }

}

exports.getAuthInfo = getAuthInfo
exports.getUserInfo = getUserInfo
