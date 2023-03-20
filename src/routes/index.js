const accountRouter = require('./account.route')
const authRouter = require('./auth.route')
const classroomRouter = require('./classroom.route')
const markRouter = require('./mark.route')
const reportRouter = require('./report.route')
const ruleRouter = require('./rule.route')
const studentRouter = require('./student.route')

const { isLogin } = require('../middlewares/auth.middleware')

const { yearService, semesterService, classroomService, accountService, roleService, gradeService, authService } = require('../services')

const initialRoutes = (app) => {

  app.get('/', [isLogin], async (req, res) => {

    switch (req.session.user.role) {
      case 'VT1':
        res.render('dashboard/staff', { documentTitle: 'Trang chủ' })
        break;

      case 'VT2':
        const currentYear = await yearService.getCurrentYear()
        const currentSemester = await semesterService.getCurrentSemester()
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
        const roles = await roleService.getRoleList()

        res.render('dashboard/admin', {
          documentTitle: 'Trang chủ',
          accounts,
          roles,
        })
        break;
      
      case 'VT4':
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
      console.log(error);      
    }
  })


  app.use(authRouter)
  app.use('/hoc-sinh', studentRouter)
  app.use('/lop-hoc', classroomRouter)
  app.use('/diem', markRouter)
  app.use('/tai-khoan', accountRouter)
  app.use('/bao-cao', reportRouter)
  app.use('/quy-dinh', ruleRouter)
}

module.exports = initialRoutes
