const { Op } = require('sequelize')
const { Student } = require('../models')
const errorHelper = require('../helpers/error.helper')
const generateId = require('../helpers/generateId.helper')

function studentService() {

  const getStudentList = async () => {
    try {
      const result = await Student.findAll({
        order: [ ['enrollDate', 'DESC'] ]
      })

      return result
    } catch (error) {
      console.error('student service: getStudentList');
      throw errorHelper('Lỗi hệ thống') 
    }
  }

  const getStudentById = async (id) => {
    try {
      const result = await Student.findByPk(id)

      return result
    } catch (error) {
      throw errorHelper('Lỗi hệ thống')
    }
  }
  
  const getStudentBySearch = async (info, type) => {

    if(info == '') {
      throw errorHelper('Thông tin tìm kiếm không hợp lệ')
    }

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
          break;
      }

      return result

    } catch (error) {
      console.error('studentService: getStudentBySearch');
      throw errorHelper('Lỗi hệ thống')
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
      console.error('student service: addStudent');
      throw errorHelper('Thêm học sinh không thành công')
    }

  }

  return {
    getStudentList,
    getStudentById,
    addStudent,
    getStudentBySearch,
  }
}

module.exports = studentService
