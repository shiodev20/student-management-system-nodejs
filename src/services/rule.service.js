const { Rule } = require('../models')
const customError = require('../utils/customError')


const getRuleList = async () => {
  try {
    const result = await Rule.findAll()
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
    const minAge = await Rule.findOne({
      where: { id: { [Op.eq]: 'QD1' } }
    })

    const maxAge = await Rule.findOne({
      where: { id: { [Op.eq]: 'QD2' } }
    })

    console.log(minAge);
    
    const age = currentYear - studentYearOfDob

    if (age >= minAge.value && age <= maxAge.value) return true

    return false

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

exports.getRuleList = getRuleList
exports.checkStudentAge = checkStudentAge
