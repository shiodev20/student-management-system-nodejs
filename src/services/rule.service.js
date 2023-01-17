const { Rule } = require('../models')
const errorHelper = require('../helpers/error.helper')
 
function ruleService() {

  const getRuleList = async () => {
    try {
      const result = await Rule.findOne()
      return result
    } catch (error) {
      console.error('rule service: getRuleList');
      throw errorHelper('Lỗi hệ thống')
    }
  }

  const checkStudentAge = async (dob) => {
    const studentYearOfDob = new Date(dob).getFullYear()
    const currentYear = new Date().getFullYear()

    try {
      const ageRule = await Rule.findOne({
        attributes: ['minAge', 'maxAge']
      })

      const age = currentYear - studentYearOfDob

      if(age >= ageRule.minAge && age <= ageRule.maxAge) return true
      
      return false

    } catch (error) {
      console.error('rule service: checkStudentAge');
      throw errorHelper('Lỗi hệ thống')
    }
  }

  return {
    getRuleList,
    checkStudentAge
  }
}

module.exports = ruleService
