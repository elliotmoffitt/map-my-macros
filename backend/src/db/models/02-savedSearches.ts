'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize: any, DataTypes: any) => {
  class SavedSearches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SavedSearches.init({
    name: DataTypes.STRING,
    food: DataTypes.STRING,
    minCalories: DataTypes.STRING,
    maxCalories: DataTypes.STRING,
    minProtein: DataTypes.STRING,
    maxProtein: DataTypes.STRING,
    minCarbs: DataTypes.STRING,
    maxCarbs: DataTypes.STRING,
    minFat: DataTypes.STRING,
    maxFat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SavedSearches',
  });
  return SavedSearches;
};
