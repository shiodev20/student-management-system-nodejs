const { 
  yearService, 
  semesterService, 
  classroomService,
  subjectService,
  markTypeService,
  markService,
} = require('../services')

function markController() {

  const { getCurrentYear } = yearService()
  const { getCurrentSemester } = semesterService()
  const { getClassroomById } = classroomService()
  const { getSubjectByTeacher } = subjectService()
  const { getMarkTypeList } = markTypeService()
  const { getMarkOfClassroomBySubject } = markService()

  const getMarkAdd = async (req, res, next) => {
    const { id } = req.params

    try { 
      const currentYear = await getCurrentYear()
      const currentSemester = await getCurrentSemester()
      const classroom = await getClassroomById(id)
      const subject = await getSubjectByTeacher(req.session.user.id)
      const markTypes = await getMarkTypeList()

      
      const studentMarks = await getMarkOfClassroomBySubject(classroom.id, currentSemester.id, subject.id)

      // return res.json(studentMarks)
      res.render('mark/add', {
        documentTitle: 'Nhập điểm',
        currentYear,
        currentSemester,
        classroom,
        subject,
        markTypes,
        studentMarks,
      })

    } catch (error) {
      console.log(error);
      // switch (error.code) {
      //   case 0:
      //     err.type = 'errorMsg'
      //     err.message = error.message
      //     err.url = `/lop-hoc/${classroomId}`
      //     break;
      //   case 1:
      //     err.type = 'errorMsg'
      //     err.message = error.message
      //     err.url = `/lop-hoc/${classroomId}`
      //     break;
      // }

      // next(err)
    }
  }

  const postMarkAdd = async (req, res, next) => {
  }

  return {
    getMarkAdd,
    postMarkAdd,
  }
}

module.exports = markController
