const bcrypt = require('bcrypt')
const customError = require('../utils/customError')

const { sendMail } = require('../utils/mailer')
const { authService, accountService, userService } = require('../services')

const err = { type: '', message: '', url: '' }


const getLogin = (req, res, next) => {
  res.render('auth/login', { documentTitle: 'Đăng nhập' })
}


const postLogin = async (req, res, next) => {
  const { username, password } = req.body

  try {
    if (!username || !password) {
      throw customError(2, 'Vui lòng nhập đầy đủ thông tin')
    }

    const account = await accountService.getAccountByUsername(username)
        
    if (!account || !account.status) {
      throw customError(2, 'Tài khoản không tồn tại hoặc bị vô hiệu hóa')
    }

    const isMatch = await bcrypt.compare(password, account.password)

    if (!isMatch) {
      throw customError(2, 'Tài khoản hoặc mật khẩu không chính xác')
    }

    const user = await authService.getAuthInfo(account.id)

    req.session.regenerate((err) => {
      req.session.auth = true
      req.session.user = user
      res.redirect('/')
    })

  } catch (error) {
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/dang-nhap'
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/dang-nhap'
        break;
      case 2:
        err.type = 'formMsg'
        err.message = error.message
        err.url = '/dang-nhap'
        break;
    }

    next(err)
  }
}


const getForgotPassword = async (req, res, next) => {
  try {
    res.render('auth/forgot-password', {
      documentTitle: 'Quên mật khẩu'
    })
  } catch (error) {
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/quen-mat-khau`
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/quen-mat-khau`
        break;
    }

    next(err)
  }
}


const postForgotPassword = async (req, res, next) => {
  const { username } = req.body

  try {
    if(!username) throw customError(2, `Vui lòng nhập đầy đủ thông tin`)

    const user = await userService.getUserId(username)

    if(!user) throw customError(2, `Tài khoản không tồn tại`)

    const account = await user.getAccount()

    sendMail(user.email, 'Lấy lại mật khẩu', `
    <a href="http://localhost:3000/lay-lai-mat-khau/${user.id}?token=${account.password}"> Verify </a>`
    )

    req.flash('successMsg', `Gửi mail xác thực thành công`)
    res.redirect('/quen-mat-khau')

  } catch (error) {
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/quen-mat-khau`
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/quen-mat-khau`
        break;
      case 2:
        err.type = 'formMsg'
        err.message = error.message
        err.url = `/quen-mat-khau`
        break;
    }

    next(err)
  }
}


const getResetPassword = async (req, res, next) => {
  const { id } = req.params
  const { token } = req.query

  try {
    res.render('auth/reset-password', {
      documentTitle: 'Lấy lại mật khẩu',
      data: { id, token}
    })
  } catch (error) {
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/quen-mat-khau`
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/quen-mat-khau`
        break;
    }

    next(err)
  }
}


const postResetPassword = async (req, res, next) => {
  const { id } = req.params
  const { token } = req.query
  const { newPassword, newPassword2 } = req.body
  try {
    if(!newPassword || !newPassword2) throw customError(2, `Vui lòng nhập đầy đủ thông tin`)
    if(newPassword !== newPassword2) throw customError(2, `Mật khẩu không trùng khớp`)
    if(newPassword < 6 || newPassword2 < 6) throw customError(2, `Mật khẩu phải từ 6 ký tự trở lên`)

    const result = await accountService.forgotPassword(id, token, newPassword)

    req.flash('successMsg', 'Đổi mật khẩu thành công')
    res.redirect('/dang-nhap')

  } catch (error) {
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url =  `/lay-lai-mat-khau/${id}?token=${token}`
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url =  `/lay-lai-mat-khau/${id}?token=${token}`
        break;
      case 2:
        err.type = 'formMsg'
        err.message = error.message
        err.url = `/lay-lai-mat-khau/${id}?token=${token}`
        break;
    }

    next(err)
  }
}


const getLogout = async (req, res, next) => {

  req.session.destroy((err) => {
    res.redirect('/dang-nhap')
  })

}


module.exports = {
  getLogin,
  postLogin,
  getForgotPassword,
  postForgotPassword,
  getResetPassword,
  postResetPassword,
  getLogout,
}