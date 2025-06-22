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
        type: Sequelize.STRING,
      },
      proteinDaily: {
        type: Sequelize.STRING,
      },
      carbsDaily: {
        type: Sequelize.STRING,
      },
      fatDaily: {
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
