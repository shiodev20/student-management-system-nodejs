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
      classroomSubjectId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subjectTeacherId: {
        primaryKey: true,
        type: Sequelize.STRING(6),
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('teachingassignments');
  }
};