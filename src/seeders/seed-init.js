'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('rules', [
      {
        minAge: 15,
        maxAge: 20,
        classSize: 40,
        passMark: 5
      }
    ], {})
    console.log('done ', 'rules');


    await queryInterface.bulkInsert('roles', [
      { id: 'VT1', name: 'Giáo vụ' },
      { id: 'VT2', name: 'Giáo viên' },
      { id: 'VT3', name: 'Quản trị viên' }
    ], {})
    console.log('done ', 'roles');

    await queryInterface.bulkInsert('years', [
      { id: 'NH2122', name: '2021-2022', status: 1 },
      { id: 'NH2223', name: '2022-2023', status: 0 },
      { id: 'NH2324', name: '2023-2024', status: 0 },
    ], {})
    console.log('done ', 'years');

    await queryInterface.bulkInsert('semesters', [
      { id: 'HK1', name: 'Học kỳ 1', status: 1 },
      { id: 'HK2', name: 'Học kỳ 2', status: 0 },
    ], {})
    console.log('done ', 'semesters');

    await queryInterface.bulkInsert('grades', [
      { id: 'KH10', name: 'Khối 10' },
      { id: 'KH11', name: 'Khối 11' },
      { id: 'KH12', name: 'Khối 12' },
    ], {})
    console.log('done ', 'grades');

    await queryInterface.bulkInsert('subjects', [
      { id: 'MH1', name: 'Toán', coefficient: 2 },
      { id: 'MH2', name: 'Văn', coefficient: 2 },
      { id: 'MH3', name: 'Lý', coefficient: 1 },
      { id: 'MH4', name: 'Hóa', coefficient: 1 },
      { id: 'MH5', name: 'Sinh', coefficient: 1 },
      { id: 'MH6', name: 'Sử', coefficient: 1 },
      { id: 'MH7', name: 'Địa', coefficient: 1 },
      { id: 'MH8', name: 'Giáo dục công dân', coefficient: 1 },
      { id: 'MH9', name: 'Ngoại ngữ', coefficient: 1 },
    ], {})
    console.log('done ', 'subjects');

    await queryInterface.bulkInsert('marktypes', [
      { id: 'LD1', name: 'Miệng', coefficient: 1 },
      { id: 'LD2', name: '15 phút', coefficient: 1 },
      { id: 'LD3', name: '45 phút', coefficient: 2 },
      { id: 'LD4', name: 'Thi học kỳ', coefficient: 3 },
      { id: 'LD5', name: 'Trung bình môn', coefficient: null },
    ], {})
    console.log('done ', 'marktypes');

    await queryInterface.bulkInsert('students', [
      {
        id: "HS1",
        firstName: "Leona",
        lastName: "Yoseloff",
        gender: 0,
        dob: "1995-07-06",
        address: "23580 La Follette Street",
        parentName: "Leona Tauret",
        parentPhone: "3759552263",
        enrollDate: '2023-01-13 07:27:39'
      },
      {
        id: "HS2",
        firstName: "John",
        lastName: "Doe",
        gender: 1,
        dob: "1995-07-06",
        address: "23580 La Follette Street",
        parentName: "Anna Doe",
        parentPhone: "3759552263",
        enrollDate: '2023-01-13 08:27:39'
      },
      {
        id: "HS3",
        firstName: "skylie",
        lastName: "Bayept",
        gender: 0,
        dob: "1995-07-06",
        address: "23580 La Follette Street",
        parentName: "Skylie Josh",
        parentPhone: "3759552263",
        enrollDate: '2023-01-13 09:27:39'
      },
      {
        id: "HS4",
        firstName: "Tim",
        lastName: "Parkle",
        gender: 1,
        dob: "1995-07-06",
        address: "23580 La Follette Street",
        parentName: "Mason Parkle",
        parentPhone: "3759552263",
        enrollDate: '2023-01-13 10:27:39'
      },
    ], {})
    console.log('done ', 'students');

    await queryInterface.bulkInsert('Accounts', [
      {
        id: 'TK1',
        username: 'NV1',
        password: '$2b$10$9uT8hlVXwLU6ZnGgu46RtuGS5rJLTZmzPjjIGUov4CEe4ALWt2u..',
        status: 1,
        roleId: 'VT1'
      },
      {
        id: 'TK2',
        username: 'NV2',
        password: '$2b$10$dqPTEcwSnZT/oXaXzMOCb.UB.Ork4eVe4gxk8lg4kf8UVuPtwoS6O',
        status: 1,
        roleId: 'VT1'
      },
      {
        id: 'TK3',
        username: 'NV3',
        password: '$2b$10$VukYajXX4rPwtFc7uWwGyex31bE5FqRPi9OuENafHqJ6EFaKsnp3K',
        status: 1,
        status: 0,
        roleId: 'VT1'
      },
      {
        id: 'TK4',
        username: 'NV4',
        password: '$2b$10$4wrouDHTRF1T.khO50LeTOiEuuGLmA4zHPVud0KRkiJDy.2XgXOIa',
        status: 1,
        roleId: 'VT3'
      },
      {
        id: 'TK5',
        username: 'NV05',
        password: '$2b$10$5k.Ab6ux3gO8GYKRxvzOCuqlhSqGRcXDmMs/v22kSYkbtpS.AipmW',
        status: 1,
        roleId: 'VT3'
      }
    ], {})
    console.log('done ', 'accounts');

    await queryInterface.bulkInsert('employees', [
      {
        id: "NV1",
        firstName: "Leona",
        lastName: "Yoseloff",
        gender: 0,
        dob: "1995-07-06",
        address: "23580 La Follette Street",
        email: "lyoseloff0@princeton.edu",
        phone: "3759552263",
        accountId: 'TK1',
      },
      {
        id: "NV2",
        firstName: "Kristal",
        lastName: "Tomek",
        gender: 0,
        dob: "1973-12-21",
        address: "891 Lillian Trail",
        email: "ktomek1@google.com",
        phone: "4872961506",
        accountId: 'TK2',
      },
      {
        id: "NV3",
        firstName: "Si",
        lastName: "Aldhouse",
        gender: 1,
        dob: "1977-12-30",
        address: "10324 Bashford Circle",
        email: "saldhouse2@hao123.com",
        phone: "6299830993",
        accountId: 'TK3',
      },
      {
        id: "NV4",
        firstName: "Noak",
        lastName: "Haslin",
        gender: 1,
        dob: "1983-12-24",
        address: "77 Becker Alley",
        email: "nhaslin3@fc2.com",
        phone: "3105964100",
        accountId: 'TK4',
      },
      {
        id: "NV5",
        firstName: "Syd",
        lastName: "Georgeau",
        gender: 1,
        dob: "1970-04-05",
        address: "6 Lotheville Pass",
        email: "sgeorgeau4@linkedin.com",
        phone: "1095019190",
        accountId: 'TK5',
      }
    ])
    console.log('done ', 'employees');

    await queryInterface.bulkInsert('teachers', [
      {
        id: 'GV1',
        firstName: 'Vasilis',
        lastName: 'Kimbly',
        gender: 0,
        dob: '1972-07-04',
        address: '1051 Golden Leaf Drive',
        email: "sgeorgeau4@linkedin.com",
        phone: '5484261865',
        subjectId: 'MH1',
        accountId: 'TK5'
      },
      {
        id: 'GV2',
        firstName: 'Marcellina',
        lastName: 'Michel',
        gender: 1,
        dob: '1972-07-04',
        address: '338 Hudson Parkway',
        email: "sgeorgeau4@linkedin.com",
        phone: '1762753746',
        subjectId: 'MH1',
        accountId: null
      },
      {
        id: 'GV3',
        firstName: 'Annis',
        lastName: 'Whinney',
        gender: 1,
        dob: '1972-07-04',
        address: '27 Esch Park',
        email: "sgeorgeau4@linkedin.com",
        phone: '1254944004',
        subjectId: 'MH2',
        accountId: null
      },
      {
        id: 'GV4',
        firstName: 'Carmen',
        lastName: 'Feighney',
        gender: 0,
        dob: '1972-07-04',
        address: '338 Hudson Parkway',
        email: "sgeorgeau4@linkedin.com",
        phone: '1762753746',
        subjectId: 'MH2',
        accountId: null
      },
      {
        id: 'GV5',
        firstName: 'Ronnica',
        lastName: 'Riolfi',
        gender: 0,
        dob: '1972-07-04',
        address: '7762 Butternut Point',
        email: "sgeorgeau4@linkedin.com",
        phone: '1762753746',
        subjectId: 'MH3',
        accountId: null
      },
      {
        id: 'GV6',
        firstName: 'Anetta',
        lastName: 'Pendreigh',
        gender: 1,
        dob: '1972-07-04',
        address: '5 Vernon Crossing',
        email: "sgeorgeau4@linkedin.com",
        phone: '3564418282',
        subjectId: 'MH3',
        accountId: null
      },
      {
        id: 'GV7',
        firstName: 'Mitchell',
        lastName: 'Becerro',
        gender: 1,
        dob: '1972-07-04',
        address: '62083 Laurel Junction',
        email: "sgeorgeau4@linkedin.com",
        phone: '8413465984',
        subjectId: 'MH4',
        accountId: null
      },
      {
        id: 'GV8',
        firstName: 'Mendel',
        lastName: 'Boribal',
        gender: 0,
        dob: '1972-07-04',
        address: '20 Dennis Hill',
        email: "sgeorgeau4@linkedin.com",
        phone: '1902442218',
        subjectId: 'MH4',
        accountId: null
      },
      {
        id: 'GV9',
        firstName: 'Leola',
        lastName: 'Starmer',
        gender: 1,
        dob: '1972-07-04',
        address: '202 Nevada Road',
        email: "sgeorgeau4@linkedin.com",
        phone: '4294257091',
        subjectId: 'MH5',
        accountId: null
      },
      {
        id: 'GV10',
        firstName: 'Clive',
        lastName: 'Rubinchik',
        gender: 1,
        dob: '1972-07-04',
        address: '646 Linden Park',
        email: "sgeorgeau4@linkedin.com",
        phone: '8598167059',
        subjectId: 'MH5',
        accountId: null
      },
      {
        id: 'GV11',
        firstName: 'Abel',
        lastName: 'Powlesland',
        gender: 1,
        dob: '1972-07-04',
        address: '47051 Hanover Alley',
        email: "sgeorgeau4@linkedin.com",
        phone: '8598167059',
        subjectId: 'MH6',
        accountId: null
      },
      {
        id: 'GV12',
        firstName: 'Marja',
        lastName: 'Matuszewski',
        gender: 0,
        dob: '1972-07-04',
        address: '5 Nelson Drive',
        email: "sgeorgeau4@linkedin.com",
        phone: '8598167059',
        subjectId: 'MH6',
        accountId: null
      },
      {
        id: 'GV13',
        firstName: 'Almeria',
        lastName: 'Vest',
        gender: 1,
        dob: '1972-07-04',
        address: '83039 Anthes Avenue',
        email: "sgeorgeau4@linkedin.com",
        phone: '6123969244',
        subjectId: 'MH7',
        accountId: null
      },
      {
        id: 'GV14',
        firstName: 'Minnaminnie',
        lastName: 'Oldrey',
        gender: 0,
        dob: '1972-07-04',
        address: '3 Grim Point',
        email: "sgeorgeau4@linkedin.com",
        phone: '6123969244',
        subjectId: 'MH7',
        accountId: null
      },
      {
        id: 'GV15',
        firstName: 'Fredra',
        lastName: 'Siege',
        gender: 1,
        dob: '1972-07-04',
        address: '5788 Farragut Crossing',
        email: "sgeorgeau4@linkedin.com",
        phone: '6123969244',
        subjectId: 'MH8',
        accountId: null
      },
      {
        id: 'GV16',
        firstName: 'Tynan',
        lastName: 'Rowlett',
        gender: 0,
        dob: '1972-07-04',
        address: '38 Messerschmidt Place',
        email: "sgeorgeau4@linkedin.com",
        phone: '6123969244',
        subjectId: 'MH8',
        accountId: null
      },
      {
        id: 'GV17',
        firstName: 'Othilia',
        lastName: 'Wofenden',
        gender: 0,
        dob: '1972-07-04',
        address: '7832 Onsgard Park',
        email: "sgeorgeau4@linkedin.com",
        phone: '6123969244',
        subjectId: 'MH9',
        accountId: null
      },
      {
        id: 'GV18',
        firstName: 'Grace',
        lastName: 'Larham',
        gender: 1,
        dob: '1972-07-04',
        address: '27 Columbus Trail',
        email: "sgeorgeau4@linkedin.com",
        phone: '6123969244',
        subjectId: 'MH9',
        accountId: null
      },
      {
        id: 'GV19',
        firstName: 'Bastien',
        lastName: 'Franklen',
        gender: 1,
        dob: '1972-07-04',
        address: '079 Bluestem Wa',
        email: "sgeorgeau4@linkedin.com",
        phone: '6123969244',
        subjectId: 'MH1',
        accountId: null
      },
      {
        id: 'GV20',
        firstName: 'Bastien',
        lastName: 'Franklen',
        gender: 1,
        dob: '1972-07-04',
        address: '079 Bluestem Karstens',
        email: "sgeorgeau4@linkedin.com",
        phone: '6123969244',
        subjectId: 'MH2',
        accountId: null
      },
    ], {})
    console.log('done ', 'teachers');

    await queryInterface.bulkInsert('classrooms', [
      {
        id: '10A12122',
        name: '10A1',
        size: 4,
        gradeId: 'KH10',
        yearId: 'NH2122'
      },
    ], {})
    console.log('done ', 'classrooms');

    await queryInterface.bulkInsert('teachingassignments', [
      {
        classroomId: '10A12122',
        subjectId: 'MH1',
      },
      {
        classroomId: '10A12122',
        subjectId: 'MH2',
      },
      {
        classroomId: '10A12122',
        subjectId: 'MH3',
      },
      {
        classroomId: '10A12122',
        subjectId: 'MH4',
      },
      {
        classroomId: '10A12122',
        subjectId: 'MH5',
      },
      {
        classroomId: '10A12122',
        subjectId: 'MH6',
      },
      {
        classroomId: '10A12122',
        subjectId: 'MH7',
      },
      {
        classroomId: '10A12122',
        subjectId: 'MH8',
      },
      {
        classroomId: '10A12122',
        subjectId: 'MH9',
      },
    ], {})
    console.log('done ', 'teachingassignments');

    await queryInterface.bulkInsert('classroomdetails', [
      {
        classroomId: '10A12122',
        studentId: 'HS1',
      },
      {
        classroomId: '10A12122',
        studentId: 'HS2',
      },
      {
        classroomId: '10A12122',
        studentId: 'HS3',
      },
    ])
    console.log('done ', 'lassroomdetails');

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('teachingassignments', null, {});
    // await queryInterface.bulkDelete('classroomsubjects', null, {});
    await queryInterface.bulkDelete('classroomdetails', null, {});
    await queryInterface.bulkDelete('employees', null, {});
    await queryInterface.bulkDelete('accounts', null, {});
    await queryInterface.bulkDelete('classrooms', null, {});
    await queryInterface.bulkDelete('teachers', null, {})

    await queryInterface.bulkDelete('students', null, {});
    await queryInterface.bulkDelete('years', null, {});
    await queryInterface.bulkDelete('semesters', null, {});
    await queryInterface.bulkDelete('grades', null, {});
    await queryInterface.bulkDelete('subjects', null, {});
    await queryInterface.bulkDelete('marktypes', null, {});
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('rules', null, {});
  }
};
