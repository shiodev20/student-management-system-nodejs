
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
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/'
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/'
        break;
    }

    next(err)
  }
}

const postUserAdd = async (req, res, next) => {
  try {
    if (
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
    switch(error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/nhan-vien/tao-nhan-vien'
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/nhan-vien/tao-nhan-vien'
        break;
    }

    next(err)
  }
}

const getUserSearch = async (req, res, next) => {
  const { info, type } = req.query

  try {
    if (!info) throw customError(1, `Vui lòng nhập thông tin tìm kiếm`)

    const users = await userService.getUserBySearch(info, type)
    const roles = await roleService.getRoleList()

    res.render('dashboard/hr', {
      documentTitle: 'Trang chủ',
      roles,
      users,
    })

  } catch (error) {
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/'
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/'
        break;
    }

    next(err)
  }
}

const getUserUpdate = async (req, res, next) => {
  const { id } = req.params

  try {
    const user = await userService.getUserId(id)
    const role = await user.getRole()

    res.render('user/update', {
      documentTitle: 'Cập nhật nhân viên',
      user,
      role,
    })

  } catch (error) {
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/'
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/'
        break;
    }

    next(err)
  }
}

const putUserUpdate = async (req, res, next) => {
  const { id } = req.params
  try {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.dob ||
      !req.body.gender ||
      !req.body.address ||
      !req.body.email ||
      !req.body.phone
    ) throw customError(1, `Vui lòng nhập đầy đủ thông tin`)

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      gender: Number(req.body.gender),
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
    }

    const result = await userService.updateUser(id, user)

    req.flash('successMsg', `Cập nhật nhân viên ${id} thành công`)
    res.redirect(`/nhan-vien/cap-nhat-nhan-vien/${id}`)

  } catch (error) {
    switch(error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/nhan-vien/cap-nhat-nhan-vien/${id}`
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/nhan-vien/cap-nhat-nhan-vien/${id}`
        break;
    }

    next(err)
  }
}

const deleteUserDelete = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await userService.deleteUser(id)

    req.flash('successMsg', `Xóa nhân viên ${id} thành công`)
    res.redirect('/')
    
  } catch (error) {
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/'
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/'
        break;
    }

    next(err)
  }
}

module.exports = {
  getUserAdd,
  postUserAdd,
  getUserSearch,
  getUserUpdate,
  putUserUpdate,
  deleteUserDelete,
}
