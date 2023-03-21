
const { authService } = require('../services')

const err = { type: '', message: '', url: '' }

const postChangePassword = async (req, res) => {
  const { id } = req.params
  const { oldPassword, newPassword, newPassword2 } = req.body

  try {
    const result = await authService.changePassword(id, oldPassword, newPassword, newPassword2)

    return res.json(result)

  } catch (error) {
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        res.json(err)
        break;
        
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        res.json(err)
        break;
    }
  }
}

module.exports = {
  postChangePassword,
}
