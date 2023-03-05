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
      { id: 'NH2122', name: '2021-2022', order: 1, status: 0 },
      { id: 'NH2223', name: '2022-2023', order: 2, status: 1 },
      { id: 'NH2324', name: '2023-2024', order: 3, status: 0 },
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
      {
        id: "HS5",
        firstName: "Grenville",
        lastName: "Neate",
        gender: 1,
        dob: "1995-07-06",
        address: "708 Graedel Trail",
        parentName: "Grenville Neate",
        parentPhone: "3759552263",
        enrollDate: '2023-01-13 11:27:39'
      },
      {
        id: "HS6",
        firstName: "Ilyssa",
        lastName: "Andreas",
        gender: 0,
        dob: "1995-07-06",
        address: "19394 Pine View Center",
        parentName: "Ilyssa Andreas",
        parentPhone: "3366992386",
        enrollDate: '2023-01-13 11:28:39'
      },
      {
        id: "HS7",
        firstName: "Sari",
        lastName: "Reijmers",
        gender: 0,
        dob: "1995-07-06",
        address: "9 Morrow Point",
        parentName: "Sari Reijmers",
        parentPhone: "7949187082",
        enrollDate: '2023-01-13 11:29:39'
      },
      {
        id: "HS8",
        firstName: "Saunderson",
        lastName: "Kopje",
        gender: 1,
        dob: "1995-07-06",
        address: "0746 Westerfield Drive",
        parentName: "Saunderson Kopje",
        parentPhone: "9669079872",
        enrollDate: '2023-01-13 11:30:39'
      },
      {
        id: "HS9",
        firstName: "Bertie",
        lastName: "Huckett",
        gender: 1,
        dob: "1995-07-06",
        address: "6 Jackson Pass",
        parentName: "Bertie Huckett",
        parentPhone: "2655184956",
        enrollDate: '2023-01-13 11:31:39'
      },
      {
        id: "HS10",
        firstName: "Kerwinn",
        lastName: "Vedyaev",
        gender: 1,
        dob: "1995-07-06",
        address: "0588 West Terrace",
        parentName: "Kerwinn Vedyaev",
        parentPhone: "7892353438",
        enrollDate: '2023-01-13 11:32:39'
      },
      {
        id: "HS11",
        firstName: "Bobby",
        lastName: "Ysson",
        gender: 1,
        dob: "1995-07-06",
        address: "9329 Mariners Cove Place",
        parentName: "Kerwinn Vedyaev",
        parentPhone: "3034454451",
        enrollDate: '2023-01-13 11:33:39'
      },
      {
        id: "HS12",
        firstName: "Ewart",
        lastName: "Measen",
        gender: 0,
        dob: "1995-07-06",
        address: "18969 Alpine Avenue",
        parentName: "Ewart Measen",
        parentPhone: "3034454451",
        enrollDate: '2023-01-13 11:34:39'
      },
      {
        id: "HS13",
        firstName: "Carly",
        lastName: "Cartwright",
        gender: 0,
        dob: "1995-07-06",
        address: "242 Service Terrace",
        parentName: "Carly Cartwright",
        parentPhone: "3034454451",
        enrollDate: '2023-01-13 11:35:39'
      },
      {
        id: "HS14",
        firstName: "Orville",
        lastName: "Essery",
        gender: 1,
        dob: "1995-07-06",
        address: "47 Norway Maple Road",
        parentName: "Orville Kart",
        parentPhone: "3034454451",
        enrollDate: '2023-01-13 11:36:39'
      },
      {
        id: "HS15",
        firstName: "Lydia",
        lastName: "Strettle",
        gender: 0,
        dob: "1995-07-06",
        address: "786 Fulton Lane",
        parentName: "Lydia Kaet",
        parentPhone: "3034454451",
        enrollDate: '2023-01-13 11:37:39'
      },
      {
        id: "HS16",
        firstName: "Bobine",
        lastName: "Throughton",
        gender: 1,
        dob: "1995-07-06",
        address: "192 Old Shore Trail",
        parentName: "Bobine Martin",
        parentPhone: "3034454451",
        enrollDate: '2023-01-13 11:38:39'
      },
      {
        id: "HS17",
        firstName: "Anna",
        lastName: "Carriage",
        gender: 0,
        dob: "1995-07-06",
        address: "25 Springs Court",
        parentName: "Anna futar",
        parentPhone: "2434302653",
        enrollDate: '2023-01-13 11:39:39'
      },
      {
        id: "HS18",
        firstName: "Serge",
        lastName: "Shoppee",
        gender: 0,
        dob: "1995-07-06",
        address: "25 Springs Court",
        parentName: "Serge Lazada",
        parentPhone: "3034454451",
        enrollDate: '2023-01-13 11:40:39'
      },
      {
        id: "HS19",
        firstName: "Nicholas",
        lastName: "Yakushkin",
        gender: 1,
        dob: "1995-07-06",
        address: "080 Clove Parkway",
        parentName: "Nicholas Yaksin",
        parentPhone: "3034454451",
        enrollDate: '2023-01-13 11:41:39'
      },
      {
        id: "HS20",
        firstName: "Tremayne",
        lastName: "Hendron",
        gender: 1,
        dob: "1995-07-06",
        address: "1 Cordelia Crossing",
        parentName: "Tremayne Halton",
        parentPhone: "2647506922",
        enrollDate: '2023-01-13 11:42:39'
      },
      {
        id: "HS21",
        firstName: "Darcee",
        lastName: "Brickham",
        gender: 1,
        dob: "1995-07-06",
        address: "577 Holmberg Point",
        parentName: "Darcee Halton",
        parentPhone: "2647506922",
        enrollDate: '2023-01-13 11:43:39'
      },
      {
        id: "HS22",
        firstName: "Abdul",
        lastName: "Jahns",
        gender: 0,
        dob: "1995-07-06",
        address: "7 Lakewood Gardens Plaza",
        parentName: "Abdul Dabi",
        parentPhone: "2647506922",
        enrollDate: '2023-01-13 11:44:39'
      },
      {
        id: "HS23",
        firstName: "Harold",
        lastName: "Pavie",
        gender: 1,
        dob: "1995-07-06",
        address: "22889 Scofield Court",
        parentName: "Harold Pavie",
        parentPhone: "2647506922",
        enrollDate: '2023-01-13 11:45:39'
      },
      {
        id: "HS24",
        firstName: "Berna",
        lastName: "Greaterex",
        gender: 0,
        dob: "1995-07-06",
        address: "815 Veith Point",
        parentName: "Berna Cost",
        parentPhone: "2647506922",
        enrollDate: '2023-01-13 11:46:39'
      },
      {
        id: "HS25",
        firstName: "Jayme",
        lastName: "Darrington",
        gender: 1,
        dob: "1995-07-06",
        address: "815 Veith Point",
        parentName: "Jayme Dawn",
        parentPhone: "2647506922",
        enrollDate: '2023-01-13 11:47:39'
      },
      {
        id: "HS26",
        firstName: "Liv",
        lastName: "Dunkerley",
        gender: 0,
        dob: "1995-07-06",
        address: "96 Elgar Trail",
        parentName: "Liv Lizzie",
        parentPhone: "2647506922",
        enrollDate: '2023-01-13 11:48:39'
      },
      {
        id: "HS27",
        firstName: "Ruthy",
        lastName: "Cirlos",
        gender: 1,
        dob: "1995-07-06",
        address: "29092 Holmberg Center",
        parentName: "Ruthy Miles",
        parentPhone: "2647506922",
        enrollDate: '2023-01-13 11:49:39'
      },
      {
        id: "HS28",
        firstName: "Richard",
        lastName: "Davis",
        gender: 1,
        dob: "1995-07-06",
        address: "07755 Nevada Parkway",
        parentName: "Richard Luke",
        parentPhone: "2647506922",
        enrollDate: '2023-01-13 11:50:39'
      },
      {
        id: "HS29",
        firstName: "Cortney",
        lastName: "Hamly",
        gender: 0,
        dob: "1995-07-06",
        address: "21 Lighthouse Bay Trail",
        parentName: "Cortney Martha",
        parentPhone: "2647506922",
        enrollDate: '2023-01-13 11:51:39'
      },
      {
        id: "HS30",
        firstName: "Atlanta",
        lastName: "Jachimczak",
        gender: 1,
        dob: "1995-07-06",
        address: "416 Rieder Crossing",
        parentName: "Atlanta Aqua",
        parentPhone: "2647506922",
        enrollDate: '2023-01-13 11:52:39'
      },
      {
        id: "HS31",
        firstName: "Zorana",
        lastName: "Showl",
        gender: 0,
        dob: "1995-07-06",
        address: "85 Corry Street",
        parentName: "Zorana Anna",
        parentPhone: "2647506922",
        enrollDate: '2023-01-13 11:53:39'
      },
      {
        id: "HS32",
        firstName: "Rogerio",
        lastName: "Huxton",
        gender: 1,
        dob: "1995-07-06",
        address: "12 Mayfield Road",
        parentName: "Rogerio Kate",
        parentPhone: "2647506922",
        enrollDate: '2023-01-13 11:54:39'
      },
    ], {})
    console.log('done ', 'students');

    await queryInterface.bulkInsert('accounts', [
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
        username: 'NV5',
        password: '$2b$10$5k.Ab6ux3gO8GYKRxvzOCuqlhSqGRcXDmMs/v22kSYkbtpS.AipmW',
        status: 1,
        roleId: 'VT3'
      },
      {
        id: 'TK6',
        username: 'GV1',
        password: '$2b$10$4wrouDHTRF1T.khO50LeTOiEuuGLmA4zHPVud0KRkiJDy.2XgXOIa',
        status: 1,
        roleId: 'VT2'
      },
      {
        id: 'TK7',
        username: 'GV2',
        password: '$2b$10$5k.Ab6ux3gO8GYKRxvzOCuqlhSqGRcXDmMs/v22kSYkbtpS.AipmW',
        status: 1,
        roleId: 'VT2'
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
        accountId: 'TK6'
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
        accountId: 'TK7'
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
      {
        id: '10A22122',
        name: '10A2',
        size: 4,
        gradeId: 'KH10',
        yearId: 'NH2122'
      },
      {
        id: '11A12122',
        name: '11A1',
        size: 4,
        gradeId: 'KH11',
        yearId: 'NH2122'
      },
      {
        id: '11A22122',
        name: '11A2',
        size: 4,
        gradeId: 'KH11',
        yearId: 'NH2122'
      },
      {
        id: '12A12122',
        name: '12A1',
        size: 4,
        gradeId: 'KH12',
        yearId: 'NH2122'
      },
      {
        id: '12A22122',
        name: '12A2',
        size: 4,
        gradeId: 'KH12',
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

      {
        classroomId: '10A22122',
        subjectId: 'MH1',
      },
      {
        classroomId: '10A22122',
        subjectId: 'MH2',
      },
      {
        classroomId: '10A22122',
        subjectId: 'MH3',
      },
      {
        classroomId: '10A22122',
        subjectId: 'MH4',
      },
      {
        classroomId: '10A22122',
        subjectId: 'MH5',
      },
      {
        classroomId: '10A22122',
        subjectId: 'MH6',
      },
      {
        classroomId: '10A22122',
        subjectId: 'MH7',
      },
      {
        classroomId: '10A22122',
        subjectId: 'MH8',
      },
      {
        classroomId: '10A22122',
        subjectId: 'MH9',
      },


      {
        classroomId: '11A12122',
        subjectId: 'MH1',
      },
      {
        classroomId: '11A12122',
        subjectId: 'MH2',
      },
      {
        classroomId: '11A12122',
        subjectId: 'MH3',
      },
      {
        classroomId: '11A12122',
        subjectId: 'MH4',
      },
      {
        classroomId: '11A12122',
        subjectId: 'MH5',
      },
      {
        classroomId: '11A12122',
        subjectId: 'MH6',
      },
      {
        classroomId: '11A12122',
        subjectId: 'MH7',
      },
      {
        classroomId: '11A12122',
        subjectId: 'MH8',
      },
      {
        classroomId: '11A12122',
        subjectId: 'MH9',
      },



      {
        classroomId: '11A22122',
        subjectId: 'MH1',
      },
      {
        classroomId: '11A22122',
        subjectId: 'MH2',
      },
      {
        classroomId: '11A22122',
        subjectId: 'MH3',
      },
      {
        classroomId: '11A22122',
        subjectId: 'MH4',
      },
      {
        classroomId: '11A22122',
        subjectId: 'MH5',
      },
      {
        classroomId: '11A22122',
        subjectId: 'MH6',
      },
      {
        classroomId: '11A22122',
        subjectId: 'MH7',
      },
      {
        classroomId: '11A22122',
        subjectId: 'MH8',
      },
      {
        classroomId: '11A22122',
        subjectId: 'MH9',
      },




      {
        classroomId: '12A12122',
        subjectId: 'MH1',
      },
      {
        classroomId: '12A12122',
        subjectId: 'MH2',
      },
      {
        classroomId: '12A12122',
        subjectId: 'MH3',
      },
      {
        classroomId: '12A12122',
        subjectId: 'MH4',
      },
      {
        classroomId: '12A12122',
        subjectId: 'MH5',
      },
      {
        classroomId: '12A12122',
        subjectId: 'MH6',
      },
      {
        classroomId: '12A12122',
        subjectId: 'MH7',
      },
      {
        classroomId: '12A12122',
        subjectId: 'MH8',
      },
      {
        classroomId: '12A12122',
        subjectId: 'MH9',
      },



      {
        classroomId: '12A22122',
        subjectId: 'MH1',
      },
      {
        classroomId: '12A22122',
        subjectId: 'MH2',
      },
      {
        classroomId: '12A22122',
        subjectId: 'MH3',
      },
      {
        classroomId: '12A22122',
        subjectId: 'MH4',
      },
      {
        classroomId: '12A22122',
        subjectId: 'MH5',
      },
      {
        classroomId: '12A22122',
        subjectId: 'MH6',
      },
      {
        classroomId: '12A22122',
        subjectId: 'MH7',
      },
      {
        classroomId: '12A22122',
        subjectId: 'MH8',
      },
      {
        classroomId: '12A22122',
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
      {
        classroomId: '10A12122',
        studentId: 'HS4',
      },


      {
        classroomId: '10A22122',
        studentId: 'HS5',
      },
      {
        classroomId: '10A22122',
        studentId: 'HS6',
      },
      {
        classroomId: '10A22122',
        studentId: 'HS7',
      },
      {
        classroomId: '10A22122',
        studentId: 'HS8',
      },


      {
        classroomId: '11A12122',
        studentId: 'HS9',
      },
      {
        classroomId: '11A12122',
        studentId: 'HS10',
      },
      {
        classroomId: '11A12122',
        studentId: 'HS11',
      },
      {
        classroomId: '11A12122',
        studentId: 'HS12',
      },


      {
        classroomId: '11A22122',
        studentId: 'HS13',
      },
      {
        classroomId: '11A22122',
        studentId: 'HS14',
      },
      {
        classroomId: '11A22122',
        studentId: 'HS15',
      },
      {
        classroomId: '11A22122',
        studentId: 'HS16',
      },


      {
        classroomId: '12A12122',
        studentId: 'HS17',
      },
      {
        classroomId: '12A12122',
        studentId: 'HS18',
      },
      {
        classroomId: '12A12122',
        studentId: 'HS19',
      },
      {
        classroomId: '12A12122',
        studentId: 'HS20',
      },


      {
        classroomId: '12A22122',
        studentId: 'HS21',
      },
      {
        classroomId: '12A22122',
        studentId: 'HS22',
      },
      {
        classroomId: '12A22122',
        studentId: 'HS23',
      },
      {
        classroomId: '12A22122',
        studentId: 'HS24',
      },
    ])
    console.log('done ', 'Classroomdetails');

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('teachingassignments', null, {});
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
