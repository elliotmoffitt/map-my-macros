"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize: any, DataTypes: any) => {
  class DailyGoals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  DailyGoals.init(
    {
      caloriesDaily : {
        allowNull: false,
        type: DataTypes.STRING,
      },
      proteinDaily : {
        allowNull: false,
        type: DataTypes.STRING,
      },
      carbsDaily : {
        allowNull: false,
        type: DataTypes.STRING,
      },
      fatDaily : {
        allowNull: false,
        type: DataTypes.STRING,
      },
      caloriesToday: {
        type: DataTypes.STRING,
      },
      proteinToday: {
        type: DataTypes.STRING,
      },
      carbsToday: {
        type: DataTypes.STRING,
      },
      fatToday: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "DailyGoals",
    }
  );
  return DailyGoals;
};
