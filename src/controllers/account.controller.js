const { accountService, roleService } = require('../services')
const customError = require('../utils/customError')

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
    console.log(error);
  }
}

const postAccountAdd = async (req, res, next) => {
  const { accountId, username, password, role } = req.body
  try {
    const account = {
      id: accountId,
      username,
      password,
      roleId: role
    }
    
    const result = await accountService.addAccount(account)

    req.flash('successMsg', `Cấp tài khoản cho nhân viên ${username} thành công`)
    res.redirect('/tai-khoan/tao-tai-khoan')

  } catch (error) {
    console.log(error);
    // switch (error.code) {
    //   case 1, 0:
    //     err.type = 'error'
    //     err.message = error.message
    //     err.url = `tai-khoan/tao-tai-khoan`
    //     break;
    // }
  }
}

const getAccountUpdate = async (req, res, next) => {
  const { id } = req.params

  try {
    const account = await accountService.getAccountById(id)
    const roles = await roleService.getRoleList()

    res.render('account/update', {
      documentTitle: 'Cập nhật tài khoản',
      account,
      roles,
    })

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/'
        break;
    }

    next(err)
  }
}

const putAccountUpdate = async (req, res, next) => {
  const { accountId, username, password, role } = req.body

  try {
    if (!accountId || !username || !password || !role) throw customError(1, `Vui lòng nhập đầy đủ thông tin`)

    const result = await accountService.updateAccount({
      id: accountId,
      username,
      password,
      roleId: role
    })
    
    req.flash('successMsg', `Cập nhật tài khoản ${accountId} thành công`)
    res.redirect(`/tai-khoan/cap-nhat-tai-khoan/${accountId}`)

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/tai-khoan/cap-nhat-tai-khoan/${accountId}`
        break;
    }

    next(err)
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
  getAccountUpdate,
  putAccountUpdate,
  putAccountUpdateStatus,
  deleteAccountDelete
}
