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

const getRuleById = async (id) => {
  try {
    const result = await Rule.findByPk(id)
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
    const minAge = await getRuleById('QD1')
    const maxAge = await getRuleById('QD2')

    const age = currentYear - studentYearOfDob

    if (age >= minAge.value && age <= maxAge.value) return true

    return false

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const updateRule = async () => {
  try {
    
  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

exports.getRuleList = getRuleList
exports.getRuleById = getRuleById
exports.checkStudentAge = checkStudentAge
