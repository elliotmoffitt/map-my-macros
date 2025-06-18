"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
  class SavedSearch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  SavedSearch.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      food: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      minCalories: {
        type: DataTypes.STRING,
      },
      maxCalories: {
        type: DataTypes.STRING,
      },
      minProtein: {
        type: DataTypes.STRING,
      },
      maxProtein: {
        type: DataTypes.STRING,
      },
      minCarbs: {
        type: DataTypes.STRING,
      },
      maxCarbs: {
        type: DataTypes.STRING,
      },
      minFat: {
        type: DataTypes.STRING,
      },
      maxFat: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "SavedSearch",
    }
  );
  return SavedSearch;
};
