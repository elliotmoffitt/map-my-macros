"use strict";

import { OptionsInterface } from "../../typings/seeders";

let options: OptionsInterface = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.createTable("SavedSearches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      food: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      minCalories: {
        type: Sequelize.STRING,
      },
      maxCalories: {
        type: Sequelize.STRING,
      },
      minProtein: {
        type: Sequelize.STRING,
      },
      maxProtein: {
        type: Sequelize.STRING,
      },
      minCarbs: {
        type: Sequelize.STRING,
      },
      maxCarbs: {
        type: Sequelize.STRING,
      },
      minFat: {
        type: Sequelize.STRING,
      },
      maxFat: {
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
    await queryInterface.dropTable("SavedSearches");
  },
};
