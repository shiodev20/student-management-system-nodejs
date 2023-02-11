
module.exports = (error, req, res, next) => {
  req.flash(error.type, error.message)
  res.redirect(error.url)
}
