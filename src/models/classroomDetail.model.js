'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClassroomDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClassroomDetail.init({
  }, {
    sequelize,
    timestamps: false,
    modelName: 'ClassroomDetail',
  });
  return ClassroomDetail;
};