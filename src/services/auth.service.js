const customError = require('../utils/customError')

const teacherService = require('./teacher.service')
const accountService = require('./account.service')
const employeeService = require('./employee.service')

const getUserInfo = async (accountId) => {
  try {
    let user = await employeeService.getEmployeeByAccount(accountId)
    if (!user) user = await teacherService.getTeacherByAccount(accountId)
    
    if(!user) throw customError(1, `Không tìm thấy nhân viên`)
    
    // const account = await accountService.getAccountById(accountId)

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

exports.getUserInfo = getUserInfo
