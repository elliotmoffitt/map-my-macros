"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize: any, DataTypes: any) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  History.init(
    {
      calories: { type: DataTypes.STRING },
      protein: { type: DataTypes.STRING },
      carbs: { type: DataTypes.STRING },
      fat: { type: DataTypes.STRING },
      food: { type: DataTypes.JSON },
    },
    {
      sequelize,
      modelName: "History",
    }
  );
  return History;
};
