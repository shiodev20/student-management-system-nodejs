const bcrypt = require('bcrypt')
const { accountService, roleService } = require('../services')
const customError = require('../utils/customError')


const err = { type: '', message: '', url: '' }

const getAccountAdd = async (req, res, next) => {
  res.render('account/add', {
    documentTitle: 'Tạo tài khoản'
  })
}

const postAccountAdd = async (req, res, next) => {
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
    const updateAccount = {}

    if (!accountId || !username || !password || !role) throw customError(1, `Vui lòng nhập đầy đủ thông tin`)

    const role = await roleService.getRoleById(role)
    const account = await accountService.getAccountById(accountId)

    if (account.username !== username) throw customError(1, `Tên đăng nhập không trùng khớp`)

    updateAccount.id = account.id
    updateAccount.roleId = role.id
    updateAccount.username = updateAccount.username

    const isMatchPassword = await bcrypt.compare(password, account.password)
    if (isMatchPassword) updateAccount.password = account.password
    else {
      const hashPassword = await bcrypt.hash(password, 10)
      updateAccount.password = hashPassword
    }


  } catch (error) {
    console.log(error);
  }
}

const putAccountUpdateStatus = async (req, res, next) => {
}

const deleteAccountDelete = async (req, res, next) => {
}

module.exports = {
  getAccountAdd,
  postAccountAdd,
  getAccountUpdate,
  putAccountUpdate,
  putAccountUpdateStatus,
  deleteAccountDelete
}
