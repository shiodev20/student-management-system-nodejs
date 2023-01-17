'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rules', {
      minAge: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        validate: {
          min: 0,
          max: 10,
        },
        allowNull: false,
      },
      maxAge: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 10,
        },
      },
      classSize: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      passMark: {
        primaryKey: true,
        type: Sequelize.DECIMAL(3, 1),
        allowNull: false,
        validate: {
          min: 0,
        },
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rules');
  }
};