const { Op } = require('sequelize')
const { Classroom, Teacher, Subject } = require('../models')
const customError = require('../utils/customError')

const accountService = require('./account.service')
const subjectService = require('./subject.service')
const yearService = require('./year.service')


const getTeacherById = async (id) => {
  try {
    const result = await Teacher.findByPk(id)
    if(!result) throw customError(1, `không tìm thấy giáo viên ${id}`)

    return result

  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

const getTeacherByAccount = async (accountId) => {
  try {
    const account = await accountService.getAccountById(accountId)
    
    const result = await Teacher.findOne({
      where: { accountId: { [Op.eq]: account.id } }
    })
    
    return result

  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

const getNoAssignmentHeadTeacherList = async () => {

  try {
    const assignedTeacherIds = []
    const currentYear = await yearService.getCurrentYear()

    const assignedTeachers = await Classroom.findAll({
      attributes: ['headTeacherId'],
      where: {
        [Op.and]: [
          { headTeacherId: { [Op.ne]: null } },
          { yearId: { [Op.eq]: currentYear.id } }
        ]
      }
    })

    for (const item of assignedTeachers) assignedTeacherIds.push(item.headTeacherId)

    const result = await Teacher.findAll({
      where: { id: { [Op.notIn]: assignedTeacherIds } },
      include: {
        model: Subject,
        as: 'subject'
      }
    })

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }

}

const getTeachersBySubject = async (subjectId) => {
  try {
    const subject = await subjectService.getSubjectById(subjectId)

    const result = await subject.getTeachers()

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const getAllTeachersByAllSubjects = async () => {
  try {
    const teachersBySubjects = []

    const subjects = await subjectService.getSubjectList()

    await Promise.all(subjects.map(async subject => {
      const teachers = await getTeachersBySubject(subject.id)
      teachersBySubjects.push({ subject, teachers })
    }))

    teachersBySubjects.sort((a, b) => {
      return Number(a.subject.id.substring(2)) - Number(b.subject.id.substring(2))
    })

    return teachersBySubjects

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}


exports.getTeacherById = getTeacherById
exports.getTeacherByAccount = getTeacherByAccount
exports.getNoAssignmentHeadTeacherList = getNoAssignmentHeadTeacherList
exports.getTeachersBySubject = getTeachersBySubject
exports.getAllTeachersByAllSubjects = getAllTeachersByAllSubjects
