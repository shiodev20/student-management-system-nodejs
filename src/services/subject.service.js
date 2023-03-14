const { Subject } = require('../models')
const customError = require('../utils/customError')

const teacherService = require('./teacher.service')

const getSubjectList = async () => {
  try {
    const result = await Subject.findAll()
    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const getSubjectById = async (id) => {
  try {
    const result = await Subject.findByPk(id)

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const getSubjectByTeacher = async (teacherId) => {
  try {
    const teacher = await teacherService.getTeacherById(teacherId)
    if(!teacher) throw customError(1, `Không tìm thấy giáo viên ${teacherId}`)
    
    const result = await teacher.getSubject()

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

exports.getSubjectList = getSubjectList
exports.getSubjectById = getSubjectById
exports.getSubjectByTeacher = getSubjectByTeacher
