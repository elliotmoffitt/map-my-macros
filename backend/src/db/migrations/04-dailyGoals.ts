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
      caloriesGoal: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      proteinGoal: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      carbsGoal: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fatGoal: {
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
