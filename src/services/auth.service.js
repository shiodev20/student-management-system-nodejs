const bcrypt = require('bcrypt')

const teacherService = require('./teacher.service')
const employeeService = require('./employee.service')
const accountService = require('./account.service')

const customError = require('../utils/customError')


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

const changePassword = async (id, oldPassword, newPassword, newPassword2) => {
  try {
    let account = await accountService.getAccountByUsername(id)
    if (!account) account = await teacherService.getAccountByUsername(id)

    if(!account) throw customError(1, `Không tìm thấy tài khoản ${id}`)

    const isOldPasswordMatch = await bcrypt.compare(oldPassword, account.password)
    
    if(!isOldPasswordMatch) throw customError(1, `Mật khẩu không chính xác`)

    if(newPassword !== newPassword2) throw customError()

    const newPasswordHash = await bcrypt.hash(newPassword, 10)

    const result = await account.update({
      password: newPasswordHash
    })
    
    return result

  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  } 
}

exports.getAuthInfo = getAuthInfo
exports.getUserInfo = getUserInfo
exports.changePassword = changePassword
