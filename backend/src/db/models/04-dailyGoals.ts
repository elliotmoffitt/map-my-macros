'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DailyGoals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DailyGoals.init({
    caloriesGoal: DataTypes.STRING,
    proteinGoal: DataTypes.STRING,
    carbsGoal: DataTypes.STRING,
    fatGoal: DataTypes.STRING,
    caloriesToday: DataTypes.STRING,
    proteinToday: DataTypes.STRING,
    carbsToday: DataTypes.STRING,
    fatToday: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DailyGoals',
  });
  return DailyGoals;
};