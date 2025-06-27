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
      "MenuItems",
      {
        id: {
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        restaurantName: {
          type: Sequelize.STRING,
        },
        name: {
          type: Sequelize.STRING,
        },
        imageUrl: {
          type: Sequelize.STRING,
        },
        calories: {
          type: Sequelize.STRING,
        },
        protein: {
          type: Sequelize.STRING,
        },
        carbs: {
          type: Sequelize.STRING,
        },
        fat: {
          type: Sequelize.STRING,
        },
        // DailyGoalId: {
        //   type: Sequelize.INTEGER,
        // },
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
    options.tableName = "MenuItems";
    return queryInterface.dropTable(options);
  },
};
