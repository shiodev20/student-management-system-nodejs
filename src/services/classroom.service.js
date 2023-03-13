const { Op } = require('sequelize')
const { Classroom, Teacher, Student, TeachingAssignment, ClassroomDetail, Mark } = require('../models')
const { generateClassroomId } = require('../utils/generateId')
const customError = require('../utils/customError')

const studentService = require('./student.service')
const yearService = require('./year.service')
const teacherService = require('./teacher.service')
const subjectService = require('./subject.service')
const semesterService = require('./semester.service')
const markTypeService = require('./markType.service')


const getClassroomById = async (id) => {
  try {
    const result = await Classroom.findOne({
      where: { id: { [Op.eq]: id } },
      include: { model: Teacher, as: 'headTeacher' },
    })
    if (!result) throw customError(1, `Không tìm thấy lớp học ${id}`)

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const getClassroomByYear = async (yearId) => {
  try {
    const year = await yearService.getYearById(yearId)

    const result = await Classroom.findAll({
      where: { yearId: { [Op.eq]: year.id } },
      include: { model: Teacher, as: 'headTeacher' },
    })

    return result

  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

const getClassroomByStudent = async (studentId, yearId) => {
  try {
    const student = await studentService.getStudentById(studentId)
    const year = await yearService.getYearById(yearId)

    const result = await Classroom.findOne({
      where: {
        yearId: { [Op.eq]: year.id },
      },
      include: {
        model: Student,
        as: 'students',
        attributes: [],
        through: { attributes: [] },
        where: {
          id: { [Op.eq]: student.id }
        }
      }
    })

    return result

  } catch (error) {
    if (error != 0) throw error
    throw customError()
  }
}

const getSubjectTeacherByClassroom = async (classroomId) => {
  try {
    const classroom = await getClassroomById(classroomId)

    const result = []

    const teachingAssignments = await classroom.getTeachingAssignments()

    await Promise.all(teachingAssignments.map(async item => {
      const subject = await item.getSubject()
      const subjectTeacher = await item.getSubjectTeacher()

      result.push({ subject, subjectTeacher })
    }))

    result.sort((a, b) => {
      return Number(a.subject.id.substring(2)) - Number(b.subject.id.substring(2))
    })

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const getClassroomsBySubjectTeacher = async (subjectTeacherId, yearId) => {
  try {
    const subjectTeacher = await teacherService.getTeacherById(subjectTeacherId)
    const year = await yearService.getYearById(yearId)

    const result = await Classroom.findAll({
      where: {
        yearId: { [Op.eq]: year.id },
      },
      include: [
        {
          model: Teacher,
          as: 'subjectTeachers',
          through: { attributes: [] },
          where: {
            id: { [Op.eq]: subjectTeacher.id }
          }
        },
        {
          model: Teacher,
          as: 'headTeacher'
        }
      ]
    })

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const addClassroom = async (classroom) => {
  try {
    const classroomId = generateClassroomId(classroom.yearId, classroom.name)
    const isContainClassroom = await Classroom.findByPk(classroomId)

    if (isContainClassroom) throw customError(1, 'Lớp học đã tồn tại')

    const result = await Classroom.create({
      id: classroomId,
      ...classroom,
    })

    const subjects = await subjectService.getSubjectList()

    // Thêm môn học cho lớp vừa tạo
    await Promise.all(subjects.map(async subject => {
      await TeachingAssignment.create({
        classroomId: result.id,
        subjectId: subject.id,
        subjectTeacherId: null,
      })
    }))

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const addHeadTeacherToClassroom = async (classroomId, headTeacherId) => {
  try {
    const classroom = await getClassroomById(classroomId)
    const headTeacher = await teacherService.getTeacherById(headTeacherId)
    

    // Xóa GVCN cũ khỏi "TeachingAssignemnt" (Nếu có)
    if (classroom.headTeacherId) {
      const oldHeadTeacher = await teacherService.getTeacherById(classroom.headTeacherId)

      const oldteachingAssingment = await TeachingAssignment.findOne({
        where: {
          [Op.and]: [
            { classroomId: { [Op.eq]: classroom.id } },
            { subjectId: { [Op.eq]: oldHeadTeacher.subjectId } }
          ]
        }
      })
      await oldteachingAssingment.update({ subjectTeacherId: null })
    }

    // Thêm GVCN mới vào "TeachingAssignment"
    const teachingAssingment = await TeachingAssignment.findOne({
      where: {
        [Op.and]: [
          { classroomId: { [Op.eq]: classroom.id } },
          { subjectId: { [Op.eq]: headTeacher.subjectId } }
        ]
      }
    })
    await teachingAssingment.update({ subjectTeacherId: headTeacher.id })


    const result = await classroom.update({ headTeacherId: headTeacher.id })

    return result
    
  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const addSubjectTeacherToClassroom = async (classroomId, { subjectId, teacherId }) => {
  try {
    const classroom = await getClassroomById(classroomId)
    const subject = await subjectService.getSubjectById(subjectId)
    const teacher = await teacherService.getTeacherById(teacherId)

    const teachingAssignment = await TeachingAssignment.findOne({
      where: {
        [Op.and]: [
          { classroomId: { [Op.eq]: classroom.id } },
          { subjectId: { [Op.eq]: subject.id } },
        ]
      }
    })

    const result = await teachingAssignment.update({ subjectTeacherId: teacher.id })

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError
  }
}

const addStudentToClassroom = async (classroomId, studentId) => {
  try {

    const classroom = await getClassroomById(classroomId)
    const student = await studentService.getStudentById(studentId)

    await classroom.update({ size: classroom.size + 1 })

    const semesters = await semesterService.getSemesterList()
    const markTypes = await markTypeService.getMarkTypeList()
    const subjects = await subjectService.getSubjectList()

    for (const semester of semesters) {
      for (const markType of markTypes) {
        for (const subject of subjects) {
          await Mark.create({
            yearId: classroom.yearId,
            semesterId: semester.id,
            classroomId: classroom.id,
            subjectId: subject.id,
            studentId: student.id,
            markTypeId: markType.id
          })
        }
      }
    }

    const result = await ClassroomDetail.create({
      classroomId: classroom.id,
      studentId: student.id,
    })

    return result

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const deleteStudentFromClassroom = async (classroomId, studentId) => {
  try {
    const classroom = await getClassroomById(classroomId)
    const student = await studentService.getStudentById(studentId)

    const studentMarkRecords = await Mark.findAll({
      where: {
        [Op.and]: [
          { classroomId: { [Op.eq]: classroom.id } },
          { studentId: { [Op.eq]: student.id } }
        ]
      }
    })

    await Promise.all(studentMarkRecords.map(async record => await record.destroy()))

    await classroom.update({ size: classroom.size - 1 })

    const classroomDetail = await ClassroomDetail.findOne({
      where: {
        [Op.and]: [
          { classroomId: { [Op.eq]: classroomId } },
          { studentId: { [Op.eq]: studentId } },
        ]
      }
    })

    const result = await classroomDetail.destroy()

    return result
  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

const deleteClassroom = async (id) => {
  try {

  } catch (error) {
    if (error.code != 0) throw error
    throw customError()
  }
}

exports.getClassroomById = getClassroomById
exports.getClassroomByYear = getClassroomByYear
exports.getClassroomByStudent = getClassroomByStudent
exports.getClassroomsBySubjectTeacher = getClassroomsBySubjectTeacher
exports.getSubjectTeacherByClassroom = getSubjectTeacherByClassroom
exports.addClassroom = addClassroom
exports.addHeadTeacherToClassroom = addHeadTeacherToClassroom
exports.addSubjectTeacherToClassroom = addSubjectTeacherToClassroom
exports.addStudentToClassroom = addStudentToClassroom
exports.deleteStudentFromClassroom = deleteStudentFromClassroom
exports.deleteClassroom = deleteClassroom
