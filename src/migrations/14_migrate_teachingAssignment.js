'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teachingassignments', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      classroomId: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      subjectId: {
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      subjectTeacherId: {
        type: Sequelize.STRING(10),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('teachingassignments');
  }
};