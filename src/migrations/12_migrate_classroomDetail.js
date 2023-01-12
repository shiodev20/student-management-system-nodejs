'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('classroomdetails', {
      classroomId: {
        primaryKey: true,
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      studentId: {
        primaryKey: true,
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('classroomdetails');
  }
};