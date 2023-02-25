const { Rule } = require('../models')
const customError = require('../utils/customError')

function ruleService() {

  const getRuleList = async () => {
    try {
      const result = await Rule.findOne()
      return result
    } catch (error) {
      throw customError()
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
      throw customError()
    }
  }

  return {
    getRuleList,
    checkStudentAge
  }
}

module.exports = ruleService
