'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('classrooms', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      size: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      gradeId: {
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      yearId: {
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      headTeacherId: {
        type: Sequelize.STRING(6),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('classrooms');
  }
};