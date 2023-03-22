
const { authService } = require('../services')

const postChangePassword = async (req, res) => {
  const { id } = req.params
  const { oldPassword, newPassword, newPassword2 } = req.body

  try {
    const result = await authService.changePassword(id, oldPassword, newPassword, newPassword2)

    return res.json({status: true})

  } catch (error) {
    res.json({
      status: false,
      message: error.message
    })
  }
}

module.exports = {
  postChangePassword,
}
