
function classroomController() {

  const getClassroomDashboard = async (req, res) => {
    res.render('classroom/home', {
      documentTitle: 'Quản lý lớp học'
    })
  }


  const getClassroomAdd = async (req, res) => {
    res.render('classroom/add', {
      documentTitle: 'Mở lớp'
    })
  }
  

  const postClassroomAdd = async (req, res) => {
  }
  

  const getClassroomDetail = async (req, res) => {
    res.render('classroom/detail', {
      documentTitle: 'Chi tiết lớp học'
    })
  }
  

  const getClassroomStudentAssignment = async (req, res) => {
    res.render('classroom/student-assignment', { 
      documentTitle: 'Lập danh sách lớp học',
    })
  }
  

  const postClassroomStudentAssignment = async (req, res) => {
  }
  
  const getClassroomHeadTeacherAssignment = async (req, res) => {
    res.render('classroom/headTeacher-assignment', {
      documentTitle: 'Phân công giáo viên chủ nhiệm',
    })
  }

  const postClassroomHeadTeacherAssignment = async (req, res) => {
  }
  

  const getClassroomSubjectTeacherAssignment = async (req, res) => {
    res.render('classroom/subjectTeacher-assignment', { 
      documentTitle: 'Phân công giáo viên bộ môn',
    })
  }


  const postClassroomSubjectTeacherAssignment = async (req, res) => {
  }


  const deleteClassroomDelete = async (req, res) => {
  }


  return {
    getClassroomDashboard,
    getClassroomAdd,
    postClassroomAdd,
    getClassroomDetail,
    getClassroomStudentAssignment,
    postClassroomStudentAssignment,
    getClassroomHeadTeacherAssignment,
    getClassroomSubjectTeacherAssignment,
    postClassroomHeadTeacherAssignment,
    postClassroomSubjectTeacherAssignment,
    deleteClassroomDelete,
  }
}

module.exports = classroomController
