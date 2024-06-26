'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('classroomdetails', {
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
      studentId: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('classroomdetails');
  }
};