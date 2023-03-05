const { Mark, Classroom, Student, Semester, Subject } = require('../models')
const customError = require('../utils/customError')

function markService() {

  const getMarkOfClassroomBySubject = async (classroomId, semesterId, subjectId) => {

    try {
      const classroom = await Classroom.findByPk(classroomId)
      if(!classroom) throw customError(1, `Không tìm thấy lớp học ${classroomId}`)

      const semester = await Semester.findByPk(semesterId)
      if(!semester) throw customError(1, `Không tìm thấy học kỳ ${semesterId}`)


      const subject = await Subject.findByPk(subjectId)
      if(!subject) throw customError(1, `Không tìm thấy môn học ${subjectId}`)


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
      if(error.code != 0) throw error
      throw customError()
    }
  }

	return {
		getMarkOfClassroomBySubject,
	}
}

module.exports = markService
