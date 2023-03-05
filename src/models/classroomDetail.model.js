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

      ClassroomDetail.belongsTo(models.Classroom, { foreignKey: 'classroomId', as: 'classroom' })
      ClassroomDetail.belongsTo(models.Student, { foreignKey: 'studentId', as: 'student'})
    }
  }
  ClassroomDetail.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'ClassroomDetail',
  });
  return ClassroomDetail;
};