const { accountService, roleService } = require('../services')
const customError = require('../utils/customError')
const { generateId } = require('../utils/generateId')

const err = { type: '', message: '', url: '' }


const getAccountAdd = async (req, res, next) => {
  try {
    const noAccountEmplList = await accountService.getNoAccountEmplList()
    const roles = await roleService.getRoleList()

    res.render('account/add', {
      documentTitle: 'Tạo tài khoản',
      noAccountEmplList,
      roles,
    })
    
  } catch (error) {
    switch (error.code) {
      case 1, 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `tai-khoan/tao-tai-khoan`
      break;
    }
  }
}

const postAccountAdd = async (req, res, next) => {
  const { id: username } = req.params
  
  try {
    const accountId = generateId('TK')

    const account = {
      id: accountId,
      username,
    }

    const result = await accountService.addAccount(account)

    req.flash('successMsg', `Cấp tài khoản cho nhân viên ${username} thành công`)
    res.redirect('/tai-khoan/tao-tai-khoan')

  } catch (error) {
    console.log(error);
    // switch (error.code) {
    //   case 1, 0:
    //     err.type = 'errorMsg'
    //     err.message = error.message
    //     err.url = `/tai-khoan/tao-tai-khoan/${id}`
    //     break;
    //   case 2:
    //     err.type = 'formMsg'
    //     err.message = error.message
    //     err.url = `/tai-khoan/tao-tai-khoan/${id}`
    //     break;
    // }

    // next(err)
  }
}

const putAccountUpdateStatus = async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await accountService.updateAccountStatus(id)

    req.flash('successMsg', `Cập nhật trạng thái tài khoản ${id} thành công`)
    res.redirect('/')

    
  } catch (error) {
    console.log(error);
  }
}

const putAccountResetPassword = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await accountService.resetPassword(id)

    req.flash('successMsg', ``)
    res.redirect('/')
    
  } catch (error) {
    console.log(error);
  }
}

const putAccountUpdateRole = async (req, res, next) => {
  const { id } = req.params
  const { role } = req.body
  try {
    const result = await accountService.updateAccountRole(id, role)

    req.flash('successMsg', ``)
    res.redirect('/')

  } catch (error) {
    console.log(error);
  }
}

const deleteAccountDelete = async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await accountService.deleteAccount(id)

    req.flash('successMsg', `Xóa tài khoản ${id} thành công`)
    res.redirect('/')

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAccountAdd,
  postAccountAdd,
  putAccountUpdateStatus,
  putAccountResetPassword,
  putAccountUpdateRole,
  deleteAccountDelete
}
