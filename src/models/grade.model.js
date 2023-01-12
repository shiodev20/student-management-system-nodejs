'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Grade.hasMany(models.Classroom, { foreignKey: 'gradeId', as: 'classrooms' })
    }
  }
  Grade.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Grade',
  });
  return Grade;
};