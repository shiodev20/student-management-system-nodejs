const { Rule } = require('../models')
 
function ruleService() {

  const getRuleList = async () => {
    try {
      const result = await Rule.findOne()
      return result
    } catch (error) {
      throw new Error('Lỗi hệ thống')
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
      throw new Error('Lỗi hệ thống')
    }
  }

  return {
    getRuleList,
    checkStudentAge
  }
}

module.exports = ruleService
