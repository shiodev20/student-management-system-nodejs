const { Account, Teacher, Employee } = require('../models')
const { generateAccountId} = require('../utils/generateId')
const customError = require('../utils/customError')

const { roleService } = require('../services')

const err = { type: '', message: '', url: '' }

const getApiAddAccount = async (req, res, next) => {
  const { id: emplId } = req.params

  try {
    let empl = await Teacher.findByPk(emplId)
    if(!empl) empl = await Employee.findByPk(emplId)

    const roles = await roleService.getRoleList()

    const lastAccount = await Account.findOne({
      order: [['createdAt', 'DESC']]
    })

    const accountId = generateAccountId(lastAccount.id)
    
    return res.json({
      accountId,
      emplId: empl.id,
      roles,
    })

  } catch (error) {
    console.log(error);
    // switch (error.code) {
    //   case 1, 0:
    //     err.type = 'errorMsg'
    //     err.message = error.message
    //     err.url = '/tai-khoan/tao-tai-khoan'
    //     break;
    // }
  }
}

module.exports = {
  getApiAddAccount,
}