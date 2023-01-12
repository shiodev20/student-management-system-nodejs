'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('marks', {
      yearId: {
        primaryKey: true,
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      semesterId: {
        primaryKey: true,
        type: Sequelize.STRING(6),
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
      },
      studentId: {
        primaryKey: true,
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      markTypeId: {
        primaryKey: true,
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      mark: {
        type: Sequelize.DECIMAL(3, 1),
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('marks');
  }
};