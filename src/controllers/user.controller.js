
const { roleService, userService } = require('../services')
const customError = require('../utils/customError')

const err = { type: '', message: '', url: '' }

const getUserAdd = async (req, res, next) => {
  try {
    const roles = await roleService.getRoleList()

    res.render('user/add', {
      documentTitle: 'Thêm nhân viên',
      roles,
    })
  } catch (error) {
    console.log(error);
  }
}

const postUserAdd = async (req, res, next) => {
  try {
    if(
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.dob ||
      !req.body.gender ||
      !req.body.address ||
      !req.body.email ||
      !req.body.phone ||
      !req.body.role
    ) throw customError(1, `Vui lòng nhập đầy đủ thông tin`)

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      gender: Number(req.body.gender),
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role
    }

    const result = await userService.addUser(user)

    req.flash('successMsg', `Thêm nhân viên thành công`)
    res.redirect('/nhan-vien/tao-nhan-vien')
    

  } catch (error) {
    console.log(error);
  }
}

const getUserUpdate = async (req, res, next) => {
  try {
    res.render('user/update', {
      documentTitle: 'Cập nhật nhân viên'
    })

  } catch (error) {
    console.log(error);
  }
}

const putUserUpdate = async (req, res, next) => {

}

const deleteUserDelete = async (req, res, next) => {

}

module.exports = {
  getUserAdd,
  postUserAdd,
  getUserUpdate,
  putUserUpdate,
  deleteUserDelete,
}
