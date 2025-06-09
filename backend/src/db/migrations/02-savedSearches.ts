'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SavedSearches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      food: {
        type: Sequelize.STRING
      },
      minCalories: {
        type: Sequelize.STRING
      },
      maxCalories: {
        type: Sequelize.STRING
      },
      minProtein: {
        type: Sequelize.STRING
      },
      maxProtein: {
        type: Sequelize.STRING
      },
      minCarbs: {
        type: Sequelize.STRING
      },
      maxCarbs: {
        type: Sequelize.STRING
      },
      minFat: {
        type: Sequelize.STRING
      },
      maxFat: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SavedSearches');
  }
};