const bcrypt = require('bcrypt')

const { authService } = require('../services')
const customError = require('../utils/customError')

function authController() {
  const { findAccountByUsername, getUserInfo } = authService()

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
      
      const account = await findAccountByUsername(username)

      if (!account) {
        throw customError(2, 'Tài khoản không tồn tại hoặc bị vô hiệu hóa')
      }

      const isMatch = await bcrypt.compare(password, account.password)

      if (!isMatch) {
        throw customError(2, 'Tài khoản hoặc mật khẩu không chính xác')
      }

      const user = await getUserInfo(account.id)

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

  const getLogout = async (req, res, next) => {

    req.session.destroy((err) => {
      res.redirect('/dang-nhap')
    })

  }

  return {
    getLogin,
    postLogin,
    getLogout,
  }
}


module.exports = authController