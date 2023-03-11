const { Rule } = require('../models')
const customError = require('../utils/customError')


const getRuleList = async () => {
  try {
    const result = await Rule.findOne()
    return result
  } catch (error) {
    if(error.code != 0) throw error
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

    if (age >= ageRule.minAge && age <= ageRule.maxAge) return true

    return false

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

exports.getRuleList = getRuleList
exports.checkStudentAge = checkStudentAge
