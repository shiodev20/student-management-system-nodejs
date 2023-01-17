
const isLogin = (req, res, next) => {
  if(req.session.auth) return next()
  return res.redirect('/dang-nhap')
}

const ensureLogin = (req, res, next) => {
  if(!req.session.auth) return next()
  return res.redirect('/')
}

const isStaff = (req, res, next) => {
  if(req.session.user.role == 'VT1') return next()
  return res.redirect('/')
}

const isTeacher = (req, res, next) => {
  if(req.session.user.role == 'VT2') return next()
  return res.redirect('/')
}

const isAdmin = (req, res, next) => {
  if(req.session.user.role = 'VT3') return next()
  return res.redirect('/')
}

module.exports = {
  isLogin,
  ensureLogin,
  isStaff,
  isTeacher,
  isAdmin,
}
