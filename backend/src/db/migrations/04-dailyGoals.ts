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
      calories: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      protein: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      carbs: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fat: {
        allowNull: false,
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
