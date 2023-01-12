'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Semester extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Semester.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      allowNull: false,
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Semester',
  });
  return Semester;
};