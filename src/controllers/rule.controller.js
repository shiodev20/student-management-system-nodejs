const { ruleService, subjectService, markTypeService, yearService, semesterService } = require('../services')
const customError = require('../utils/customError')

const err = { type: '', message: '', url: '' }

const getRuleDashboard = async (req, res, next) => {
  try {
    const rules = await ruleService.getRuleList()
    const subjects = await subjectService.getSubjectList()
    const markTypes = await markTypeService.getMarkTypeList()
    const years = await yearService.getYearList()
    const semesters = await semesterService.getSemesterList()

    res.render('rule/home', {
      documentTitle: 'Quản lý quy định',
      rules,
      subjects,
      markTypes,
      years,
      semesters,      
      tag: req.query.tag ? req.query.tag : null,
    })

  } catch (error) {
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/quy-dinh'
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/quy-dinh'
        break;
    }

    next(err)
  }
}

const putGeneralRuleUpdate = async (req, res, next) => {
  try {
    const rules = []

    for (const key in req.body) {
      const value = Number(req.body[key])

      if(!value) throw customError(1, `Vui lòng nhập đầy đủ thông tin`)
      if(key == 'QD4' && (value < 0 || value > 10) ) throw customError(1, `Điểm đạt phải từ 0.0 đến 10.0`)
      if(value < 0) throw customError(1, `Giá trị phải lớn hơn 0`)

      const item = {
        id: key,
        value: value
      }

      rules.push(item)
    }
    
    const result = await ruleService.updateRules(rules)

    req.flash('successMsg', `Cập nhật quy định thành công`)
    res.redirect('/quy-dinh?tag=1')
    
  } catch (error) {
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/quy-dinh?tag=1'
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/quy-dinh?tag=1'
        break;
    }
    next(err)
  }
}

const putSubjectRuleUpdate = async (req, res, next) => {
  const { ids, names, coefficients } = req.body

  try {
    const data = []

    ids.forEach((id, idx) => {
      const item = {}

      const subjectName = names[idx]
      const subjectCoefficient = Number(coefficients[idx])

      if(!subjectName || !subjectCoefficient) throw customError(1, `Vui lòng nhập đầy đủ thông tin`)
      if(subjectCoefficient <= 0 || subjectCoefficient > 10) throw customError(1, `Hệ số phải từ 1.0 đến 10.0`)

      item.id = id
      item.name = subjectName
      item.coefficient = subjectCoefficient

      data.push(item)
    })

    const result = await subjectService.updateSubjects(data)

    req.flash('successMsg', 'Cập nhật môn học thành công')
    res.redirect('/quy-dinh?tag=2')

  } catch (error) {
    switch(error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/quy-dinh?tag=2'
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/quy-dinh?tag=2'
        break;
    }

    next(err)
  }
}

const putMarkTypeRuleUpdate = async (req, res, next) => {
  const { ids, names , coefficients } = req.body

  try {
    const data = []

    ids.forEach((id, idx) => {
      const item = {}

      const markTypeName = names[idx]
      const markTypeCoefficient = coefficients[idx]

      if(!markTypeName || !markTypeCoefficient) throw customError(1, `Vui lòng nhập đầy đủ thông tin`)
      if(markTypeCoefficient <= 0 || markTypeCoefficient > 10) throw customError(1, `Hệ số phải từ 1.0 đến 10.0`)

      item.id = id
      item.name = markTypeName
      item.coefficient = markTypeCoefficient

      data.push(item)
    })
    
    const result = await markTypeService.updateMarkTypes(data)

    req.flash('successMsg', 'Cập nhật loại điểm thành công')
    res.redirect('/quy-dinh?tag=3')

  } catch (error) {
    switch(error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/quy-dinh?tag=3'
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/quy-dinh?tag=3'
        break;
    }

    next(err)
  }
}

const putSchoolTimeUpdate = async (req, res, next) => {
  const { year, semester } = req.body

  try {
    const result = ruleService.updateSchoolTime(year, semester)

    req.flash('successMsg', 'Cập nhật niên khóa thành công')
    res.redirect('/quy-dinh?tag=4')

  } catch (error) {
    switch (error.code) {
      case 0:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/quy-dinh?tag=4'
        break;
      case 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/quy-dinh?tag=4'
        break;
    }
    next(err)
  }
}

module.exports = {
  getRuleDashboard,
  putGeneralRuleUpdate,
  putSubjectRuleUpdate,
  putMarkTypeRuleUpdate,
  putSchoolTimeUpdate,
}
