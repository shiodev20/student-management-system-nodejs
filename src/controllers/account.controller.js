const { accountService, roleService } = require('../services')
const { generateId } = require('../utils/generateId')
const customError = require('../utils/customError')

const err = { type: '', message: '', url: '' }

const getAccountSearch = async (req, res, next) => {
  const { info, type } = req.query

  try {
    if(!info) throw customError(1, `Vui lòng nhập thông tin tìm kiếm`)
    const accounts = await accountService.getAccountBySearch(info, type)
    const roles = await roleService.getRoleList()

    res.render('dashboard/admin', {
      documentTitle: 'Trang chủ',
      accounts,
      roles,
      queryData: req.query
    })

  } catch (error) {
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/`
        break;

      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/`
        break;
    }

    next(err)
  }
}

const getAccountAddSearch = async (req, res, next) => {
  const { info, type } = req.query

  try {
    if(!info) throw customError(1, `Vui lòng nhập thông tin tìm kiếm`)

    const noAccountEmplList = await accountService.getNoAccountEmplListBySearch(info, type)
    const roles = await roleService.getRoleList()

    res.render('account/add', {
      documentTitle: 'Tạo tài khoản',
      noAccountEmplList,
      roles,
    })

  } catch (error) {
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/tai-khoan/tao-tai-khoan`
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/tai-khoan/tao-tai-khoan`
        break;
    }

    next(err)
  }
}

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
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `tai-khoan/tao-tai-khoan`
      break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `tai-khoan/tao-tai-khoan`
      break;
    }

    next(err)
  }
}

const postAccountAdd = async (req, res, next) => {
  const { id: username } = req.params
  
  try {
    const accountId = generateId('TK')

    const account = { id: accountId, username }

    const result = await accountService.addAccount(account)

    req.flash('successMsg', `Cấp tài khoản cho nhân viên ${username} thành công`)
    res.redirect('/tai-khoan/tao-tai-khoan')

  } catch (error) {
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/tai-khoan/tao-tai-khoan`
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/tai-khoan/tao-tai-khoan`
        break;
      case 2:
        err.type = 'formMsg'
        err.message = error.message
        err.url = `/tai-khoan/tao-tai-khoan`
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
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/`
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/`
        break;
    }

    next(err)
  }
}

const putAccountResetPassword = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await accountService.resetPassword(id)

    req.flash('successMsg', `Reset mật khẩu tài khoản ${id} thành công`)
    res.redirect('/')
    
  } catch (error) {
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/`
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/`
        break;
    }

    next(err)
  }
}

const deleteAccountDelete = async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await accountService.deleteAccount(id)

    req.flash('successMsg', `Xóa tài khoản ${id} thành công`)
    res.redirect('/')

  } catch (error) {
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/`
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/`
        break;
    }

    next(err)
  }
}

module.exports = {
  getAccountSearch,
  getAccountAddSearch,
  getAccountAdd,
  postAccountAdd,
  putAccountUpdateStatus,
  putAccountResetPassword,
  deleteAccountDelete,
}
