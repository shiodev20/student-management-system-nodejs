const { Op } = require('sequelize')
const { Student, Classroom, Year, Grade, ClassroomDetail } = require('../models')
const { generateStudentId } = require('../utils/generateId')
const customError = require('../utils/customError')

function studentService() {

  const getStudentList = async () => {
    try {
      const result = await Student.findAll({
        order: [ ['enrollDate', 'DESC'] ]
      })

      return result
    } catch (error) {
      if(error.code != 0) throw error
      throw customError()
    }
  }

  const getStudentById = async (id) => {
    try {
      const result = await Student.findByPk(id)
      if(!result) throw customError(1, `Không tìm thấy học sinh ${id}`)

      return result
      
    } catch (error) {
      if(error.code != 0) throw error
      throw customError()
    }
  }
  
  const getStudentBySearch = async (info, type) => {

    if(info == '') throw customError(1, 'Vui lòng nhập thông tin tìm kiếm')

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
      if(error.code != 0) throw error
      throw customError()
    }

  }

  const getStudentsByClassroom = async (classroomId) => {
    try {
      const classroom = await Classroom.findByPk(classroomId)

      if(!classroom) throw customError(1, `Không tìm thấy lớp học ${classroomId}`)

      const result = await classroom.getStudents()

      return result
    } catch (error) {
      if(error.code != 0) throw error
      throw customError()
    }
  }

  const getNoClassAssignmentStudents = async (gradeId, yearId) => {
    try {
      const year = await Year.findByPk(yearId)

      const yearOrder = year.order - 1
      const gradeNumber = Number(gradeId.substring(2)) - 1
      
      // Lớp muốn thêm học sinh là lớp 10
      if(gradeNumber < 10) {
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
        where: { order: { [Op.eq]: yearOrder }}
      })

      const gradeBefore = await Grade.findByPk(gradeBeforeId)

      const assignedStudents = await Student.findAll({
        attributes: ['id'],
        include: {
          model: Classroom,
          as: 'classrooms',
          through: { attributes: [] },
          where: {
            [Op.and]: [
              { gradeId: { [Op.eq]: gradeId } },
              { yearId: { [Op.eq]: yearId }},
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
              { yearId: { [Op.eq]: yearBefore.id }},
            ]
          }
        }
      })

      return result
      
    } catch (error) {
      if(error.code != 0) throw error
      throw error
    }
  }

  const addStudent = async (student) => {
    try {
      const lastStudent = await Student.findOne({
        attributes: ['id'],
        order: [ ['enrollDate', 'DESC'] ]
      })

      const studentId = generateStudentId(lastStudent.id)

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

      if(!updateStudent) throw customError(1, `Không tìm thấy học sinh ${id}`)

      const result = await updateStudent.update({ ...student })
      return result

    } catch (error) {
      if(error.code != 0) throw error
      throw customError()
    }
  }

  const deleteStudent = async (id) => {
    try {
      const deleteStudent = await Student.findByPk(id)

      if(!deleteStudent) throw customError(1, `Không tìm thấy học sinh ${id}`)

      const result = await deleteStudent.destroy()
      return result
      
    } catch (error) {
      if(error.code != 0) throw error
      throw customError()
    }
  }

  return {
    getStudentList,
    getStudentById,
    getStudentBySearch,
    getStudentsByClassroom,
    getNoClassAssignmentStudents,
    addStudent,
    updateStudent,
    deleteStudent,
  }
}

module.exports = studentService

