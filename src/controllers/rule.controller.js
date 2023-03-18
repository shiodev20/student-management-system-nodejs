const { ruleService, subjectService, markTypeService } = require('../services')


const getRuleDashboard = async (req, res, next) => {
  try {
    const rules = await ruleService.getRuleList()
    const subjects = await subjectService.getSubjectList()
    const markTypes = await markTypeService.getMarkTypeList()

    res.render('rule/home', {
      documentTitle: 'Quản lý quy định',
      rules,
      subjects,
      markTypes,
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

