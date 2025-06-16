"use strict";
import {
  Association,
  CreationOptional,
  DataTypes,
  Model,
  Optional,
} from "sequelize";
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
        allowNull: false,
        type: DataTypes.STRING,
      },
      menuItemName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      calories: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      protein: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      carbs: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      fat: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "MenuItem",
    }
  );
  return MenuItem;
};
