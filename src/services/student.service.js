const { Op } = require('sequelize')
const { Student } = require('../models')
const generateId = require('../helpers/generateId.helper')

function studentService() {

  const getStudentList = async () => {
    try {
      const result = await Student.findAll({
        order: [ ['enrollDate', 'DESC'] ]
      })

      return result
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const getStudentById = async (id) => {
    try {
      const result = await Student.findByPk(id)

      return result
    } catch (error) {
      throw new Error(error.message)
    }
  }
  
  const getStudentBySearch = async (info, type) => {

    if(info == '') throw new Error('Vui lòng nhập thông tin tìm kiếm')

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
          throw new Error('Loại tìm kiếm không phù hợp');
      }

      return result

    } catch (error) {
      throw new Error(error.message)
    }

  }

  const addStudent = async (student) => {
    try {
      const lastStudent = await Student.findOne({
        attributes: ['id'],
        order: [ ['enrollDate', 'DESC'] ]
      })

      const studentId = generateId(lastStudent.id)

      const result = await Student.create({
        id: studentId,
        ...student
      })

      return result
    } catch (error) {
      console.log(error);
      throw new Error(error.message)
    }

  }

  const updateStudent = async (id, student) => {
    try {
      const updateStudent = await Student.findByPk(id)

      if(!updateStudent) throw new Error(`Không tìm thấy học sinh ${id}`)

      const result = await updateStudent.update({ ...student })
      return result

    } catch (error) {
      throw new Error(error.message)
    }
  }

  const deleteStudent = async (id) => {
    try {
      const deleteStudent = await Student.findByPk(id)

      if(!deleteStudent) throw new Error(`Không tìm thấy học sinh ${id}`)

      const result = await deleteStudent.destroy()
      return result
      
    } catch (error) {
      throw new Error(error.message)
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
