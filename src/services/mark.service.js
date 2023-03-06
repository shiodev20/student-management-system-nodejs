const { Op } = require('sequelize')
const { Year, Mark, Classroom, Student, Semester, Subject, MarkType } = require('../models')
const customError = require('../utils/customError')

function markService() {

  const getMarksOfClassroomBySubject = async (classroomId, semesterId, subjectId) => {

    try {
      const classroom = await Classroom.findByPk(classroomId)
      if (!classroom) throw customError(1, `Không tìm thấy lớp học ${classroomId}`)

      const semester = await Semester.findByPk(semesterId)
      if (!semester) throw customError(1, `Không tìm thấy học kỳ ${semesterId}`)


      const subject = await Subject.findByPk(subjectId)
      if (!subject) throw customError(1, `Không tìm thấy môn học ${subjectId}`)


      const result = await Student.findAll({
        include: [
          {
            model: Classroom,
            as: 'classrooms',
            through: { attributes: [] },
            attributes: [],
            where: {
              id: classroom.id
            }
          },
          {
            model: Mark,
            as: 'marks',
            where: {
              semesterId: semester.id,
              subjectId: subject.id,
            }
          }
        ]
      })

      return result

    } catch (error) {
      if (error.code != 0) throw error
      throw customError()
    }
  }

  const addMarks = async (data) => {
    try {
      const result = await Promise.all(data.map(async item => {
        const mark = await Mark.findOne({
          where: {
            [Op.and]: [
              { yearId: { [Op.eq]: item.yearId } },
              { semesterId: { [Op.eq]: item.semesterId } },
              { classroomId: { [Op.eq]: item.classroomId } },
              { subjectId: { [Op.eq]: item.subjectId } },
              { studentId: { [Op.eq]: item.studentId } },
              { markTypeId: { [Op.eq]: item.markTypeId } },
            ]
          }
        })

        if (item.mark < 0) throw customError(1, 'Điểm nhập không được bé hơn 0')

        console.log(item.mark);

        if (mark.mark != item.mark) await mark.update({ mark: item.mark })
      }))

      return result

    } catch (error) {
      if (error.code != 0) throw error
      throw customError()
    }
  }

  const updateAvgMark = async (yearId, semesterId, classroomId, subjectId) => {
    try {
      const year = await Year.findByPk(yearId)
      if (!year) throw customError(1, `Không tìm thấy năm học ${yearId}`)

      const semester = await Semester.findByPk(semesterId)
      if (!semester) throw customError(1, `Không tìm thấy học kỳ ${semesterId}`)

      const classroom = await Classroom.findByPk(classroomId)
      if (!classroom) throw customError(1, `Không tìm thấy năm học ${classroomId}`)

      const subject = await Subject.findByPk(subjectId)
      if (!subject) throw customError(1, `Không tìm thấy năm học ${subjectId}`)

      const markTypes = await MarkType.findAll()
      const sumOfCoefficient = markTypes.reduce((total, item) => total + item.coefficient, 0)

      // const studentMarks = await getMarksOfClassroomBySubject(classroom.id, semester.id, subject.id)

      const studentMarks = await Student.findAll({
        include: [
          {
            model: Classroom,
            as: 'classrooms',
            through: { attributes: [] },
            attributes: [],
            where: {
              id: classroom.id
            }
          },
          {
            model: Mark,
            as: 'marks',
            where: {
              semesterId: semester.id,
              subjectId: subject.id,
            },
            include: {
              model: MarkType,
              as: 'markType'
            }
          }
        ]
      })

      // return studentMarks

      const result = await Promise.all(studentMarks.map(async student => {
        let sumOfMark = 0

        student.marks.forEach(mark => {
          sumOfMark += Number(mark.mark) * mark.markType.coefficient
        })

        const avgMark = sumOfMark / sumOfCoefficient

        const mark = await Mark.findOne({
          where: {
            [Op.and]: [
              { yearId: { [Op.eq]: year.id } },
              { semesterId: { [Op.eq]: semester.id } },
              { classroomId: { [Op.eq]: classroom.id } },
              { subjectId: { [Op.eq]: subject.id } },
              { studentId: { [Op.eq]: student.id } },
              { markTypeId: { [Op.eq]: markTypes[markTypes.length - 1].id } },
            ]
          }
        })

        await mark.update({ mark: avgMark })
      }))

      return result

    } catch (error) {
      if (error.code != 0) throw error
      throw customError()
    }
  }

  return {
    getMarksOfClassroomBySubject,
    addMarks,
    updateAvgMark,
  }
}

module.exports = markService
