module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('marks', [
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH1', studentId: 'HS000001', markTypeId: 'LD1', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH1', studentId: 'HS000001', markTypeId: 'LD2', mark: 9 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH1', studentId: 'HS000001', markTypeId: 'LD3', mark: 8.5 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH1', studentId: 'HS000001', markTypeId: 'LD4', mark: 7 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH1', studentId: 'HS000001', markTypeId: 'LD5', mark: 7.9 },

      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH2', studentId: 'HS000001', markTypeId: 'LD1', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH2', studentId: 'HS000001', markTypeId: 'LD2', mark: 9 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH2', studentId: 'HS000001', markTypeId: 'LD3', mark: 8.5 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH2', studentId: 'HS000001', markTypeId: 'LD4', mark: 7 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH2', studentId: 'HS000001', markTypeId: 'LD5', mark: 7.9 },

      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH3', studentId: 'HS000001', markTypeId: 'LD1', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH3', studentId: 'HS000001', markTypeId: 'LD2', mark: 9 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH3', studentId: 'HS000001', markTypeId: 'LD3', mark: 8.5 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH3', studentId: 'HS000001', markTypeId: 'LD4', mark: 7 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH3', studentId: 'HS000001', markTypeId: 'LD5', mark: 7.9 },


      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH4', studentId: 'HS000001', markTypeId: 'LD1', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH4', studentId: 'HS000001', markTypeId: 'LD2', mark: 9 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH4', studentId: 'HS000001', markTypeId: 'LD3', mark: 8.5 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH4', studentId: 'HS000001', markTypeId: 'LD4', mark: 7 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH4', studentId: 'HS000001', markTypeId: 'LD5', mark: 7.9 },


      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH5', studentId: 'HS000001', markTypeId: 'LD1', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH5', studentId: 'HS000001', markTypeId: 'LD2', mark: 9 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH5', studentId: 'HS000001', markTypeId: 'LD3', mark: 8.5 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH5', studentId: 'HS000001', markTypeId: 'LD4', mark: 7 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH5', studentId: 'HS000001', markTypeId: 'LD5', mark: 7.9 },


      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH6', studentId: 'HS000001', markTypeId: 'LD1', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH6', studentId: 'HS000001', markTypeId: 'LD2', mark: 9 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH6', studentId: 'HS000001', markTypeId: 'LD3', mark: 8.5 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH6', studentId: 'HS000001', markTypeId: 'LD4', mark: 7 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH6', studentId: 'HS000001', markTypeId: 'LD5', mark: 7.9 },


      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH7', studentId: 'HS000001', markTypeId: 'LD1', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH7', studentId: 'HS000001', markTypeId: 'LD2', mark: 9 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH7', studentId: 'HS000001', markTypeId: 'LD3', mark: 8.5 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH7', studentId: 'HS000001', markTypeId: 'LD4', mark: 7 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH7', studentId: 'HS000001', markTypeId: 'LD5', mark: 7.9 },


      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH8', studentId: 'HS000001', markTypeId: 'LD1', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH8', studentId: 'HS000001', markTypeId: 'LD2', mark: 9 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH8', studentId: 'HS000001', markTypeId: 'LD3', mark: 8.5 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH8', studentId: 'HS000001', markTypeId: 'LD4', mark: 7 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH8', studentId: 'HS000001', markTypeId: 'LD5', mark: 7.9 },


      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH9', studentId: 'HS000001', markTypeId: 'LD1', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH9', studentId: 'HS000001', markTypeId: 'LD2', mark: 9 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH9', studentId: 'HS000001', markTypeId: 'LD3', mark: 8.5 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH9', studentId: 'HS000001', markTypeId: 'LD4', mark: 7 },
      { yearId: 'NH2122', semesterId: 'HK1', classroomId: '10A12122', subjectId: 'MH9', studentId: 'HS000001', markTypeId: 'LD5', mark: 7.9 },


      // HK2


      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH1', studentId: 'HS000001', markTypeId: 'LD1', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH1', studentId: 'HS000001', markTypeId: 'LD2', mark: 9 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH1', studentId: 'HS000001', markTypeId: 'LD3', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH1', studentId: 'HS000001', markTypeId: 'LD4', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH1', studentId: 'HS000001', markTypeId: 'LD5', mark: 8.1 },

      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH2', studentId: 'HS000001', markTypeId: 'LD1', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH2', studentId: 'HS000001', markTypeId: 'LD2', mark: 9 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH2', studentId: 'HS000001', markTypeId: 'LD3', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH2', studentId: 'HS000001', markTypeId: 'LD4', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH2', studentId: 'HS000001', markTypeId: 'LD5', mark: 8.1 },

      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH3', studentId: 'HS000001', markTypeId: 'LD1', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH3', studentId: 'HS000001', markTypeId: 'LD2', mark: 9 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH3', studentId: 'HS000001', markTypeId: 'LD3', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH3', studentId: 'HS000001', markTypeId: 'LD4', mark: 7 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH3', studentId: 'HS000001', markTypeId: 'LD5', mark: 8.1 },


      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH4', studentId: 'HS000001', markTypeId: 'LD1', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH4', studentId: 'HS000001', markTypeId: 'LD2', mark: 9 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH4', studentId: 'HS000001', markTypeId: 'LD3', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH4', studentId: 'HS000001', markTypeId: 'LD4', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH4', studentId: 'HS000001', markTypeId: 'LD5', mark: 8.1 },


      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH5', studentId: 'HS000001', markTypeId: 'LD1', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH5', studentId: 'HS000001', markTypeId: 'LD2', mark: 9 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH5', studentId: 'HS000001', markTypeId: 'LD3', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH5', studentId: 'HS000001', markTypeId: 'LD4', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH5', studentId: 'HS000001', markTypeId: 'LD5', mark: 8.1 },


      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH6', studentId: 'HS000001', markTypeId: 'LD1', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH6', studentId: 'HS000001', markTypeId: 'LD2', mark: 9 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH6', studentId: 'HS000001', markTypeId: 'LD3', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH6', studentId: 'HS000001', markTypeId: 'LD4', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH6', studentId: 'HS000001', markTypeId: 'LD5', mark: 8.1 },


      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH7', studentId: 'HS000001', markTypeId: 'LD1', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH7', studentId: 'HS000001', markTypeId: 'LD2', mark: 9 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH7', studentId: 'HS000001', markTypeId: 'LD3', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH7', studentId: 'HS000001', markTypeId: 'LD4', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH7', studentId: 'HS000001', markTypeId: 'LD5', mark: 8.1 },


      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH8', studentId: 'HS000001', markTypeId: 'LD1', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH8', studentId: 'HS000001', markTypeId: 'LD2', mark: 9 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH8', studentId: 'HS000001', markTypeId: 'LD3', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH8', studentId: 'HS000001', markTypeId: 'LD4', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH8', studentId: 'HS000001', markTypeId: 'LD5', mark: 8.1 },


      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH9', studentId: 'HS000001', markTypeId: 'LD1', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH9', studentId: 'HS000001', markTypeId: 'LD2', mark: 9 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH9', studentId: 'HS000001', markTypeId: 'LD3', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH9', studentId: 'HS000001', markTypeId: 'LD4', mark: 8 },
      { yearId: 'NH2122', semesterId: 'HK2', classroomId: '10A12122', subjectId: 'MH9', studentId: 'HS000001', markTypeId: 'LD5', mark: 8.1 },

    ], {})
    console.log('done ', 'marks');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('marks', null, {});
  }
}