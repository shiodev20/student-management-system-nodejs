const authService = require('./auth.service')
const semesterService = require('./semester.service')
const yearService = require('./year.service')
const studentService = require('./student.service')
const classroomService = require('./classroom.service')
const gradeService = require('./grade.service')
const ruleService = require('./rule.service')

module.exports = {
  authService,
  semesterService,
  yearService,
  gradeService,
  studentService,
  classroomService,
  ruleService,
}
