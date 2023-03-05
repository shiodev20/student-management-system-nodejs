const { Subject, Teacher } = require('../models')
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

  const getSubjectByTeacher = async (teacherId) => {
    try {
      const teacher = await Teacher.findByPk(teacherId)
      if(!teacher) throw customError(1, `không tìm thấy giáo viên ${teacher}`)

      const result = await teacher.getSubject()

      return result

    } catch (error) {
      if(error.code != 0) throw error
      throw customError()
    }
  }

  return {
    getSubjectList,
    getSubjectByTeacher,
  }
}

module.exports = subjectService
