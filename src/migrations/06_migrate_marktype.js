'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('marktypes', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      coefficient: {
        type: Sequelize.INTEGER.UNSIGNED,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('marktypes');
  }
};