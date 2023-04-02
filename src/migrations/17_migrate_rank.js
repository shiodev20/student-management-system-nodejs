'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ranks', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      minValue: {
        type: Sequelize.DECIMAL(3, 1),
        allowNull: false,
      },
      maxValue: {
        type: Sequelize.DECIMAL(3, 1),
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ranks');
  }
};