const bcrypt = require('bcrypt')

const { authService } = require('../services')


function authController() {

  const { findAccountByUsername, getUserInfo } = authService()

  const getLogin = (req, res) => {
    res.render('auth/login', { documentTitle: 'Đăng nhập' })
  }
  
  const postLogin = async (req, res) => {
    const { username, password } = req.body

    if(!username || !password) {
      req.flash('formMsg', 'Vui lòng nhập đầy đủ thông tin')
      return res.redirect('/dang-nhap')
    }

    try {
      const account = await findAccountByUsername(username)

      if(!account) {
        req.flash('formMsg', 'Tài khoản không tồn tại hoặc bị vô hiệu hóa')
        return res.redirect('/dang-nhap')
      }
      else {
        const isMatch = await bcrypt.compare(password, account.password)

        if(isMatch) {
          const user = await getUserInfo(account.id)

          req.session.regenerate((err) => {
            req.session.auth = true
            req.session.user = user
            res.redirect('/')
          })
        }
        else {
          req.flash('formMsg', 'Tài khoản hoặc mật khẩu không chính xác')
          return res.redirect('/dang-nhap')
        }
      }

    } catch (error) {
      req.flash('errorMsg', error.message)
      return res.redirect('/dang-nhap')
    }
  }
  
  const getLogout = async (req, res) => {

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