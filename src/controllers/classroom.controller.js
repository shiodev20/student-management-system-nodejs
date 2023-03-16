const { classroomService, yearService, gradeService, semesterService, teacherService, studentService } = require('../services')
const customError = require('../utils/customError')


const err = { type: '', message: '', url: '' }


const getClassroomDashboard = async (req, res, next) => {
  try {
    let selectedYear = ''

    if (req.query.year) {
      selectedYear = req.query.year
    }
    else {
      const currentYear = await yearService.getCurrentYear()
      selectedYear = currentYear.id
    }

    const years = await yearService.getYearList()
    const grades = await gradeService.getGradeList()
    const classrooms = await classroomService.getClassroomByYear(selectedYear)

    res.render('classroom/home', {
      documentTitle: 'Quản lý lớp học',
      selectedYear,
      years,
      grades,
      classrooms,
    })

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/'
        break;
    }

    return next(err)
  }
}


const getClassroomAdd = async (req, res, next) => {
  try {
    const currentYear = await yearService.getCurrentYear()
    const grades = await gradeService.getGradeList()

    res.render('classroom/add', {
      documentTitle: 'Mở lớp',
      currentYear,
      grades,
    })

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/lop-hoc/mo-lop-hoc'
        break;
    }

    next(err)
  }
}


const postClassroomAdd = async (req, res, next) => {
  try {
    if (!req.body.year || !req.body.grade || !req.body.classroomName) {
      throw customError(2, 'Vui lòng nhập đầy đủ thông tin')
    }

    const classroom = {
      yearId: req.body.year,
      gradeId: req.body.grade,
      name: req.body.classroomName.toUpperCase(),
    }

    const result = await classroomService.addClassroom(classroom)

    if (result) {
      req.flash('successMsg', `Lớp học được tạo thành công`)
      res.redirect('/lop-hoc/mo-lop-hoc')
    }

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/lop-hoc/mo-lop-hoc'
        break;
      case 2:
        err.type = 'formMsg'
        err.message = error.message
        err.url = '/lop-hoc/mo-lop-hoc'
        break;
    }

    next(err)
  }
}


const postClassroomsAdd = async (req, res, next) => {
  const { year, grade, quantity } = req.body
  try {
    const result = await classroomService.addClassrooms(year, grade, quantity)

    req.flash('successMsg', `Mở ${quantity} lớp học thành công`)
    res.redirect('/lop-hoc/mo-lop-hoc')

  } catch (error) {
    console.log(error);
  }
}


const getClassroomDetail = async (req, res, next) => {
  const { id } = req.params

  try {
    const classroom = await classroomService.getClassroomById(id)
    if(!classroom) throw customError(1, `Không tìm thấy lớp học ${id}`)

    const currentYear = await yearService.getCurrentYear()
    const currentSemester = await semesterService.getCurrentSemester()
    const students = await studentService.getStudentsByClassroom(classroom.id)
    const subjectTeachers = await classroomService.getSubjectTeacherByClassroom(classroom.id)

    res.render('classroom/detail', {
      documentTitle: `Lớp ${id}`,
      classroom,
      currentYear,
      currentSemester,
      students,
      subjectTeachers,
    })

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/lop-hoc'
        break;
    }

    next(err)
  }
}


const getClassroomStudentAssignment = async (req, res, next) => {
  const { id } = req.params

  try {
    const classroom = await classroomService.getClassroomById(id)
    if(!classroom) throw customError(1, `Không tìm thấy lớp học ${id}`)

    const noClassroomAssignStudents = await studentService.getNoClassAssignmentStudents(classroom.gradeId, classroom.yearId)

    res.render('classroom/student-assignment', {
      documentTitle: `Lập danh sách lớp ${id}`,
      classroom,
      noClassroomAssignStudents,
    })

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/lop-hoc/${id}`
        break;
    }

    next(err)
  }
}


const postClassroomStudentAssignment = async (req, res, next) => {
  const { id: classroomId } = req.params
  let { studentIds } = req.body

  try {
    studentIds = !Array.isArray(studentIds) ? [studentIds] : studentIds

    for (const studentId of studentIds) {
      await classroomService.addStudentToClassroom(classroomId, studentId)
    }

    req.flash('successMsg', `Thêm học sinh vào lớp ${classroomId} thành công`)
    res.redirect(`/lop-hoc/lap-danh-sach-lop-hoc/${classroomId}`)

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/lop-hoc/lap-danh-sach-lop-hoc/${classroomId}`
        break;

    }

    next(err)
  }

}


const getClassroomHeadTeacherAssignment = async (req, res, next) => {
  const { id } = req.params

  try {
    const classroom = await classroomService.getClassroomById(id)
    if(!classroom) throw customError(1, `Không tìm thấy lớp học ${id}`)

    const noAssignmentHeadTeacherList = await teacherService.getNoAssignmentHeadTeacherList()

    res.render('classroom/headTeacher-assignment', {
      documentTitle: 'Phân công giáo viên chủ nhiệm',
      classroom,
      noAssignmentHeadTeacherList,
    })

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = '/lop-hoc'
        break;
    }

    next(err)
  }
}


const postClassroomHeadTeacherAssignment = async (req, res, next) => {
  const { id: classroomId } = req.params
  const { headTeacherId } = req.body

  try {
    if (!classroomId || !headTeacherId) {
      throw customError(1, 'Vui lòng chọn giáo viện cần phân công')
    }

    const result = await classroomService.addHeadTeacherToClassroom(classroomId, headTeacherId)

    req.flash('successMsg', 'Cập nhật GVCN thành công')
    res.redirect(`/lop-hoc/phan-cong-gvcn/${classroomId}`)

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/lop-hoc/phan-cong-gvcn/${classroomId}`
        break;
    }

    next(err)
  }
}


const getClassroomSubjectTeacherAssignment = async (req, res, next) => {
  const { id } = req.params
  try {
    const classroom = await classroomService.getClassroomById(id)
    if(!classroom) throw customError(1, `Không tìm thấy lớp học ${id}`)

    const teachersBySubjects = await teacherService.getAllTeachersByAllSubjects()
    
    res.render('classroom/subjectTeacher-assignment', {
      documentTitle: 'Phân công giáo viên bộ môn',
      classroom,
      teachersBySubjects,
    })

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/lop-hoc/phan-cong-gvbm/${id}`
        break;
    }

    next(err)
  }
}


const postClassroomSubjectTeacherAssignment = async (req, res, next) => {
  const { id: classroomId } = req.params
  const { ...data } = req.body

  try {
    const subjectTeachingAssignment = []

    for (const key in data) {
      if (data[key] != '') {
        const item = { subjectId: key, teacherId: data[key] }
        subjectTeachingAssignment.push(item)
      }
    }

    await Promise.all(subjectTeachingAssignment.map(async item => {
      await classroomService.addSubjectTeacherToClassroom(classroomId, item)
    }))

    req.flash('successMsg', 'Phân công GVBM thành công')
    res.redirect(`/lop-hoc/${classroomId}`)

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/lop-hoc/phan-cong-gvbm/${classroomId}`
        break;
    }

    next(err)
  }
}


const deleteStudentClassroomDelete = async (req, res, next) => {
  const { id: classroomId, studentId } = req.params

  try {
    const result = await classroomService.deleteStudentFromClassroom(classroomId, studentId)

    req.flash('successMsg', `Xóa học sinh ${studentId} lớp học ${classroomId} thành công`)
    res.redirect(`/lop-hoc/${classroomId}`)

  } catch (error) {
    switch (error.code) {
      case 0, 1:
        err.type = 'errorMsg'
        err.message = error.message
        err.url = `/lop-hoc/${classroomId}`
        break;
    }

    next(err)
  }
}


const deleteClassroomDelete = async (req, res, next) => {
  const { id } = req.params

  try {
    // Dùng modal check xem lớp đã có học sinh hay chưa
    const result = await classroomService.deleteClassroom(id)

    return res.json(result)

  } catch (error) {
    console.log(error);

  }
}

module.exports = {
  getClassroomDashboard,
  getClassroomAdd,
  postClassroomAdd,
  postClassroomsAdd,
  getClassroomDetail,
  getClassroomStudentAssignment,
  postClassroomStudentAssignment,
  getClassroomHeadTeacherAssignment,
  getClassroomSubjectTeacherAssignment,
  postClassroomHeadTeacherAssignment,
  postClassroomSubjectTeacherAssignment,
  deleteStudentClassroomDelete,
  deleteClassroomDelete,
}
