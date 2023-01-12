const express = require('express')
const db = require('./models')
const { Op, QueryTypes } = require('sequelize')

const app = express()

try {
  db.sequelize.authenticate(() => {
    console.log('db connected');
  })
} catch (error) {
  console.log('db connect fail');
}

app.get('/select', async (req, res) => {

  // const accounts = await db.Account.findAll()

  // const accounts = await db.Account.findAll({
  //   attributes: ['id', 'username', 'password']
  // })

  // const accounts = await db.Account.findAll({
  //   attributes: ['id', 'username', 'password', ['status', 'grant']]
  // })

  // const accounts = await db.Account.findAll({
  //   attributes: { exclude: ['id'] }
  // })

  const accounts = await db.Account.findAll({
    attributes: {
      include: [
        [db.sequelize.fn('NOW'), 'now']
      ]
    }
  })

  res.json(accounts)
})

app.get('/where', async (req, res) => {

  // const employees = await db.Employee.findAll({
  // where: {
  //   gender: {
  //     [Op.eq]: 1
  //   }
  // }
  // })

  // const accounts = await db.Account.findAll({
  //   where: {
  //     roleId: {
  //       [Op.in]: ['VT1', 'VT3']
  //     }
  //   }
  // })

  // const employees = await db.Employee.findAll({
  //   where: {
  //     [Op.and]: [
  //       { gender: { [Op.eq]: 1 } },
  //       { email: { [Op.like]: '%.com%'} }
  //     ]
  //   }
  // })

  // const teachers = await db.Teacher.findAll({
  //   where: {
  //     [Op.and]: [
  //       db.sequelize.where(db.sequelize.fn('char_length', db.sequelize.col('firstName')), 7),
  //       {
  //         email: {
  //           [Op.and]: {
  //             [Op.like]: 's%',
  //             [Op.like]: '%@%'
  //           }
  //         }
  //       }
  //     ]

  //   }
  // })

  res.json(teachers)
})

app.get('/order', async (req, res) => {

  // const subjects = await db.Subject.findAll({
  //   order: [
  //     ['coefficient', 'DESC'],
  //     'name',
  //   ]
  // })

  const accounts = await db.Account.findAll({
    attributes: [
      'roleId',
      [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'quantity']
    ],
    group: 'roleId',
    having: {
      quantity: {
        [Op.gt]: 2
      }
    }
  })

  res.json(accounts)
})

app.get('/raw', async (req, res) => {

  // const teachers = await db.sequelize.query('SELECT * FROM `teachers`', { 
  //   type: QueryTypes.SELECT,
  //   model: db.Teacher
  // })

  const employees = await db.sequelize.query('SELECT * FROM `employees` WHERE gender = :gender', {
    type: QueryTypes.SELECT,
    replacements: { gender: 0 }
  })

  res.json(employees)

})

app.get('/', async (req, res) => {

  // const account = await db.Account.findOne({
  //   where: { id: { [Op.eq]: 'TK1' } },
  //   include: {
  //     model: db.Role,
  //     as: 'role'
  //   }
  // })

  // const employees = await db.Employee.findAll({
  //   attributes: ['id', 'lastName'],
  //   where: {
  //     gender: { [Op.eq]: 0 }
  //   },
  //   include: {
  //     model: db.Account,
  //     as: 'account',
  //     // required: true,
  //     attributes: ['id', 'username'],
  //     where: {
  //       status: { [Op.eq]: 1 }
  //     }
  //   }
  // })

  // const employees = await db.Employee.findAll({
  //   where: {
  //     '$account.status$': { [Op.eq]: 1 }
  //   },
  //   include: {
  //     model: db.Account,
  //     as: 'account',
  //   }
  // })

  // const role = await db.Role.findAll({
  //   where: {
  //     [Op.and]:[
  //       { id: { [Op.eq]: 'VT1' } },
  //       { '$accounts.status$': { [Op.eq]: 0 } }
  //     ]
  //   },
  //   include: {
  //     model: db.Account,
  //     as: 'accounts',

  //   }
  // })

  // const employee = await db.Employee.findOne({
  //   where: { id: { [Op.eq]: 'NV1' }},
  //   include: {
  //     model: db.Account,
  //     as: 'account',
  //   }
  // })
  // const employeeRole = await employee.account.getRole()

  // const classroom = await db.Classroom.findByPk('10A12122')
  // const students = await classroom.getStudents()

  // const classroom = await db.Classroom.findOne({
  //   where: { id: { [Op.eq]: '10A12122' } },
  //   include: {
  //     model: db.Student,
  //     as: 'students',
  //     through: {
  //       attributes: []
  //     }
  //   }
  // })

  const classroom = await db.Classroom.findAll({
    include: [
      {
        model: db.Subject,
        as: 'subjects',
        through: { attributes: [] },
      },
      {
        model: db.ClassroomSubject,
        as: 'classroomSubjects',
        include: {
          model: db.Teacher,
          as: 'subjectTeacher',
          through: { attributes: [] }
        }
      }
    ]

  })

  res.json(classroom)
})

app.listen(3000, () => {
  console.log('app is running');
})
