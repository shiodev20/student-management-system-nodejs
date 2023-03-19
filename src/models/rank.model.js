'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rank.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    minValue: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: false,
    },
    maxValue: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: false,
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Rank',
  });
  return Rank;
};