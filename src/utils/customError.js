
const customError = (code = 0, message = 'Lỗi hệ thống vui lòng thử lại sau') => {
  const error = new Error(message)
  error.code = code

  return error
}

module.exports = customError
