"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.createTable("DailyGoals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      caloriesDaily: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      proteinDaily: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      carbsDaily: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fatDaily: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      caloriesToday: {
        type: Sequelize.STRING,
      },
      proteinToday: {
        type: Sequelize.STRING,
      },
      carbsToday: {
        type: Sequelize.STRING,
      },
      fatToday: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.dropTable("DailyGoals");
  },
};
