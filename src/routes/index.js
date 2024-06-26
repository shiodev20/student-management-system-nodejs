const accountRouter = require('./account.route')
const authRouter = require('./auth.route')
const classroomRouter = require('./classroom.route')
const markRouter = require('./mark.route')
const reportRouter = require('./report.route')
const ruleRouter = require('./rule.route')
const studentRouter = require('./student.route')
const userRouter = require('./user.route')
const apiRouter = require('./api.route')



const { isLogin } = require('../middlewares/auth.middleware')

const { yearService, semesterService, classroomService, accountService, roleService, gradeService, authService, userService } = require('../services')
const { Student, Classroom, Teacher, Employee } = require('../models')

const err = { type: '', message: '', url: '' }

const initialRoutes = (app) => {

  app.get('/', [isLogin], async (req, res) => {
    let roles = null
    let currentYear = null
    let currentSemester = null

    switch (req.session.user.role) {
      case 'VT1':
        currentYear = await yearService.getCurrentYear()
        currentSemester = await semesterService.getCurrentSemester()

        const studentCount = await Student.count()
        const classroomCount = await Classroom.count()
        const employeeCount = await Employee.count()
        const teacherCount = await Teacher.count()

        res.render('dashboard/staff', { 
          documentTitle: 'Trang chủ',
          currentYear,
          currentSemester,
          studentCount,
          classroomCount,
          employeeCount,
          teacherCount,
        })
        break;

      case 'VT2':
        currentYear = await yearService.getCurrentYear()
        currentSemester = await semesterService.getCurrentSemester()
        const grades = await gradeService.getGradeList()
        const classroomsBySubjectTeacher = await classroomService.getClassroomsBySubjectTeacher(req.session.user.id, currentYear.id)

        res.render('dashboard/teacher', { 
          documentTitle: 'Trang chủ', 
          currentYear,
          currentSemester,
          grades,
          classrooms: classroomsBySubjectTeacher,
        })
        break;

      case 'VT3':
        const accounts = await accountService.getAccountList()
        roles = await roleService.getRoleList()

        res.render('dashboard/admin', {
          documentTitle: 'Trang chủ',
          accounts,
          roles,
        })
        break;
      
      case 'VT4':
        const users = await userService.getUserList()
        roles = await roleService.getRoleList()
        
        res.render('dashboard/hr', {
          documentTitle: 'Trang chủ',
          roles,
          users,
        })
        break;

      default:
        req.flash('errorMsg', 'Không xác thực được quyền người dùng')
        res.redirect('/dang-nhap')
        break;
    }
  })

  app.get('/thong-tin-ca-nhan/:id', [isLogin], async (req, res) => {
    const { id } = req.params

    try {
      const info = await authService.getUserInfo(id)

      res.render('account/info', {
        documentTitle: 'Thông tin cá nhân',
        info,
      })
    } catch (error) {
      switch (error.code) {
        case 0, 1:
          err.type = 'errorMsg'
          err.message = error.message
          err.url = '/'
          break;
      }
    }
  })


  app.use(authRouter)
  app.use('/hoc-sinh', studentRouter)
  app.use('/lop-hoc', classroomRouter)
  app.use('/diem', markRouter)
  app.use('/tai-khoan', accountRouter)
  app.use('/bao-cao', reportRouter)
  app.use('/nhan-vien', userRouter)
  app.use('/quy-dinh', ruleRouter)
  app.use('/api', apiRouter)

  app.use('*', (req, res, next) => {
    res.render('pages/404', {
      documentTitle: '404'
    })
  })
  
}

module.exports = initialRoutes
