"use strict";

import { OptionsInterface } from "../../typings/seeders";

let options: OptionsInterface = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.createTable(
      "DailyGoals",
      {
        id: {
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
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      },
      options
    );
  },
  async down(queryInterface: any, Sequelize: any) {
    options.tableName = "DailyGoals";
    return queryInterface.dropTable(options);
  },
};
