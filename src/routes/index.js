const accountRouter = require('./account.route')
const authRouter = require('./auth.route')
const classroomRouter = require('./classroom.route')
const markRouter = require('./mark.route')
const reportRouter = require('./report.route')
const ruleRouter = require('./rule.route')
const studentRouter = require('./student.route')
const apiRouter = require('./api.route')

const { isLogin } = require('../middlewares/auth.middleware')

const { yearService, semesterService, classroomService, accountService } = require('../services')

const initialRoutes = (app) => {

  app.get('/', [isLogin], async (req, res) => {

    switch (req.session.user.role) {
      case 'VT1':
        res.render('dashboard/staff', { documentTitle: 'Trang chủ' })
        break;

      case 'VT2':
        const currentYear = await yearService.getCurrentYear()
        const currentSemester = await semesterService.getCurrentSemester()
        const classrooms = await classroomService.getClassroomsBySubjectTeacher(req.session.user.id, currentYear.id)

        res.render('dashboard/teacher', { 
          documentTitle: 'Trang chủ', 
          currentYear,
          currentSemester,
          classrooms,
        })
        break;

      case 'VT3':
        const accounts = await accountService.getAccountList()
        
        res.render('dashboard/admin', {
          documentTitle: 'Trang chủ',
          accounts,
        })
        break;

      default:
        req.flash('errorMsg', 'Không xác thực được quyền người dùng')
        res.redirect('/dang-nhap')
        break;
    }
  })

  app.use(authRouter)
  app.use('/hoc-sinh', studentRouter)
  app.use('/lop-hoc', classroomRouter)
  app.use('/diem', markRouter)
  app.use('/tai-khoan', accountRouter)
  app.use('/bao-cao', reportRouter)
  app.use('/quy-dinh', ruleRouter)
  app.use('/api', apiRouter)
}

module.exports = initialRoutes
