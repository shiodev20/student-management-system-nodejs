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
      tag: req.body.tag ? req.body.tag : null,
    })

  } catch (error) {
    console.log(error);
  }
}

const putGeneralRuleUpdate = async (req, res, next) => {

  try {
    const rules = await ruleService.getRuleList()
    const subjects = await subjectService.getSubjectList()
    const markTypes = await markTypeService.getMarkTypeList()

    res.render('rule/home', {
      documentTitle: 'Quản lý quy định',
      rules,
      subjects,
      markTypes,
      tag: req.body.tag
    })
  } catch (error) {
    console.log(error);
  }
}

const putSubjectRuleUpdate = async (req, res, next) => {

  try {
    const rules = await ruleService.getRuleList()
    const subjects = await subjectService.getSubjectList()
    const markTypes = await markTypeService.getMarkTypeList()

    res.render('rule/home', {
      documentTitle: 'Quản lý quy định',
      rules,
      subjects,
      markTypes,
      tag: req.body.tag
    })
  } catch (error) {
    console.log(error);
  }
}

const putMarkTypeRuleUpdate = async (req, res, next) => {

  try {
    const rules = await ruleService.getRuleList()
    const subjects = await subjectService.getSubjectList()
    const markTypes = await markTypeService.getMarkTypeList()

    res.render('rule/home', {
      documentTitle: 'Quản lý quy định',
      rules,
      subjects,
      markTypes,
      tag: req.body.tag
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getRuleDashboard,
  putGeneralRuleUpdate,
  putSubjectRuleUpdate,
  putMarkTypeRuleUpdate,
}
