"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
  class MenuItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  MenuItem.init(
    {
      restaurantName: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      calories: {
        type: DataTypes.STRING,
      },
      protein: {
        type: DataTypes.STRING,
      },
      carbs: {
        type: DataTypes.STRING,
      },
      fat: {
        type: DataTypes.STRING,
      },
      // DailyGoalId: {
      //   type: DataTypes.INTEGER,
      // },
    },
    {
      sequelize,
      modelName: "MenuItem",
    }
  );
  return MenuItem;
};
