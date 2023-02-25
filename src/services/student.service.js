const { Op } = require('sequelize')
const { Student } = require('../models')
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
      throw customError()
    }
  }

  const getStudentById = async (id) => {
    try {
      const result = await Student.findByPk(id)

      return result
    } catch (error) {
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
    addStudent,
    updateStudent,
    deleteStudent,
  }
}

module.exports = studentService
