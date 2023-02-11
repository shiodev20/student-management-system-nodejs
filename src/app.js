const path = require('path')
const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')

const initialRoutes = require('./routes')

const errorMiddleware = require('./middlewares/error.middleware')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }))
app.use(flash())
app.use(methodOverride('_method'))

app.use((req, res, next) => {
  res.locals.successMsg = req.flash('successMsg')
  res.locals.errorMsg = req.flash('errorMsg')
  res.locals.formMsg = req.flash('formMsg')

  if(req.session.user) {
    res.locals.currentUser = {
      id: req.session.user.id,
      fullName: req.session.user.fullName,
    }
  }

  next()
})

initialRoutes(app)

app.use(errorMiddleware)

app.listen(3000, () => {
  console.log('app is running');
})
