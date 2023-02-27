const { Subject } = require('../models')
const customError = require('../utils/customError')

function subjectService() {

  const getSubjectList = async () => {
    try {
      const result = await Subject.findAll()
      return result

    } catch (error) { 
      if (error.code != 0) throw error
      throw customError()
    }
  }

  return {
    getSubjectList
  }
}

module.exports = subjectService
