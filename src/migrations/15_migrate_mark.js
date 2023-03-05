'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('marks', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      yearId: {
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      semesterId: {
        type: Sequelize.STRING(6),
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
      studentId: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      markTypeId: {
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      mark: {
        type: Sequelize.DECIMAL(3, 1),
        defaultValue: 0,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('marks');
  }
};