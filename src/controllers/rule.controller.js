const { ruleService } = require('../services')


const getRuleDashboard = async (req, res, next) => {
  try {
    const rules = await ruleService.getRuleList()
    

    res.render('rule/home', {
      documentTitle: 'Quản lý quy định',
      rules,
    })

  } catch (error) {
    console.log(error);
  }
}

// const getRuleUpdate = async (req, res) => {
//   res.render('rule/update', {
//     documentTitle: 'Cập nhật quy định',
//   })
// }

// const putRuleUpdate = async (req, res) => {
// }

module.exports = {
  getRuleDashboard,
  // getRuleUpdate,
  // putRuleUpdate,
}

