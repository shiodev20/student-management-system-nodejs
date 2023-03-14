const { Op } = require('sequelize')
const { Student, Classroom, Year, ClassroomDetail } = require('../models')
const { generateId } = require('../utils/generateId')
const customError = require('../utils/customError')

const classroomService = require('./classroom.service')
const yearService = require('./year.service')
const gradeService = require('./grade.service')

const getStudentList = async () => {
  try {
    const result = await Student.findAll({
      order: [['enrollDate', 'DESC']]
    })

    return result
  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const getStudentById = async (id) => {
  try {
    const result = await Student.findByPk(id)

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const getStudentBySearch = async (info, type) => {

  if (info == '') throw customError(1, 'Vui lòng nhập thông tin tìm kiếm')

  try {
    let result = null

    switch (type) {
      case '0':
        result = await Student.findAll({
          where: { id: { [Op.eq]: info } }
        })
        break;

      case '1':
        result = await Student.findAll({
          where: {
            [Op.or]: [
              { firstName: { [Op.like]: `%${info}%` } },
              { lastName: { [Op.like]: `%${info}%` } },
            ]
          }
        })
        break;
      default:
        throw customError(1, 'Loại tìm kiếm không phù hợp')
    }

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }

}

const getStudentsByClassroom = async (classroomId) => {
  try {
    const classroom = await classroomService.getClassroomById(classroomId)
    if (!classroom) throw customError(1, `Không tìm thấy lớp học ${classroomId}`)

    const result = await classroom.getStudents()

    return result
  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const getNoClassAssignmentStudents = async (gradeId, yearId) => {
  try {
    const year = await yearService.getYearById(yearId)
    if(!year) throw customError(1, `Không tìm thấy năm học ${yearId}`)

    const yearOrder = year.order - 1
    const gradeNumber = Number(gradeId.substring(2)) - 1

    // Lớp muốn thêm học sinh là lớp 10
    if (gradeNumber < 10) {
      const assignedStudentsId = []
      const assignedStudents = await ClassroomDetail.findAll()
      assignedStudents.forEach(item => assignedStudentsId.push(item["StudentId"]))

      const noAssignStudents = await Student.findAll({
        where: {
          id: { [Op.notIn]: assignedStudentsId }
        }
      })

      return noAssignStudents
    }

    const gradeBeforeId = "KH" + gradeNumber

    const yearBefore = await Year.findOne({
      where: { order: { [Op.eq]: yearOrder } }
    })

    const gradeBefore = await gradeService.getGradeById(gradeBeforeId)
    if(!gradeBefore) throw customError(1, `Không tìm thấy khối lớp ${gradeBeforeId}`)

    const assignedStudents = await Student.findAll({
      attributes: ['id'],
      include: {
        model: Classroom,
        as: 'classrooms',
        through: { attributes: [] },
        where: {
          [Op.and]: [
            { gradeId: { [Op.eq]: gradeId } },
            { yearId: { [Op.eq]: yearId } },
          ]
        }
      }
    })

    const assignedStudentIds = []

    assignedStudents.forEach(student => assignedStudentIds.push(student.id))


    const result = await Student.findAll({
      where: {
        id: { [Op.notIn]: assignedStudentIds }
      },
      include: {
        model: Classroom,
        as: 'classrooms',
        through: { attributes: [] },
        where: {
          [Op.and]: [
            { gradeId: { [Op.eq]: gradeBefore.id } },
            { yearId: { [Op.eq]: yearBefore.id } },
          ]
        }
      }
    })

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw error
  }
}

const addStudent = async (student) => {
  try {
    const studentId = generateId('HS')

    const result = await Student.create({
      id: studentId,
      ...student
    })

    return result
  } catch (error) {
    throw customError()
  }

}

const updateStudent = async (id, student) => {
  try {
    const updateStudent = await Student.findByPk(id)

    if (!updateStudent) throw customError(1, `Không tìm thấy học sinh ${id}`)

    const result = await updateStudent.update({ ...student })
    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const deleteStudent = async (id) => {
  try {
    const deleteStudent = await getStudentById(id)
    if (!deleteStudent) throw customError(1, `Không tìm thấy học sinh ${id}`)

    const result = await deleteStudent.destroy()
    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

exports.getStudentList = getStudentList
exports.getStudentById = getStudentById
exports.getStudentBySearch = getStudentBySearch
exports.getStudentsByClassroom = getStudentsByClassroom
exports.getNoClassAssignmentStudents = getNoClassAssignmentStudents
exports.addStudent = addStudent
exports.updateStudent = updateStudent
exports.deleteStudent = deleteStudent
