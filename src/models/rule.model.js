'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Rule.init({
    minAge: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 10,
      },
      allowNull: false,
    },
    maxAge: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 10,
      },
    },
    classSize: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    passMark: {
      primaryKey: true,
      type: DataTypes.DECIMAL(3, 1),
      allowNull: false,
      validate: {
        min: 0,
      },
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Rule',
  });
  return Rule;
};