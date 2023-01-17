
function accountController() {
  
  const getAccountAdd = async (req, res) => {
    res.render('account/add', {
      documentTitle: 'Tạo tài khoản'
    })
  }
  
  const postAccountAdd = async (req, res) => {
  }
  
  const getAccountUpdate = async (req, res) => {
    res.render('account/update', {
      documentTitle: 'Cập nhật tài khoản'
    })
  }

  const putAccountUpdate = async (req, res) => {
  }

  const putAccountUpdateStatus = async (req, res) => {
  }
  
  const deleteAccountDelete = async (req, res) => {
  }

  return {
    getAccountAdd,
    postAccountAdd,
    getAccountUpdate,
    putAccountUpdate,
    putAccountUpdateStatus,
    deleteAccountDelete
  }
}

module.exports = accountController
