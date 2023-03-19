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
      tag: req.query.tag ? req.query.tag : null,
    })

  } catch (error) {
    console.log(error);
  }
}

const putGeneralRuleUpdate = async (req, res, next) => {

  try {
    const rules = []

    for (const key in req.body) {
      const item = {
        id: key,
        value: Number(req.body[key])
      }

      rules.push(item)
    }
    
    const result = await ruleService.updateRules(rules)

    req.flash('successMsg', `Cập nhật quy định thành công`)
    res.redirect('/quy-dinh?tag=1')
    
  } catch (error) {
    console.log(error);
  }
}

const putSubjectRuleUpdate = async (req, res, next) => {
  const { ids, names, coefficients } = req.body

  try {
    const data = []

    ids.forEach((id, idx) => {
      const item = {}

      item.id = id
      item.name = names[idx]
      item.coefficient = Number(coefficients[idx])

      data.push(item)
    })

    const result = await subjectService.updateSubjects(data)

    req.flash('successMsg', 'Cập nhật môn học thành công')
    res.redirect('/quy-dinh?tag=2')

  } catch (error) {
    console.log(error);
  }
}

const putMarkTypeRuleUpdate = async (req, res, next) => {
  const { ids, names , coefficients } = req.body

  try {
    const data = []

    ids.forEach((id, idx) => {
      const item = {}

      item.id = id
      item.name = names[idx]
      item.coefficient = Number(coefficients[idx])

      data.push(item)
    })
    
    // return res.json(data)

    const result = await markTypeService.updateMarkTypes(data)

    req.flash('successMsg', 'Cập nhật loại điểm thành công')
    res.redirect('/quy-dinh?tag=3')

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
