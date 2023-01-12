'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('classroomsubjects', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      classroomId: {
        primaryKey: true,
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      subjectId: {
        primaryKey: true,
        type: Sequelize.STRING(6),
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('classroomsubjects');
  }
};