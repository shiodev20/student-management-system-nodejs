'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Classroom.belongsTo(models.Grade, { foreignKey: 'gradeId', as: 'grade' })
      Classroom.belongsTo(models.Year, { foreignKey: 'yearId', as: 'year' })
      Classroom.belongsTo(models.Teacher, { foreignKey: 'headTeacherId', as: 'headTeacher' })

      Classroom.belongsToMany(models.Student, { through: models.ClassroomDetail, as: 'students'})


      Classroom.belongsToMany(models.Subject, { through: models.ClassroomSubject, foreignKey: 'classroomId', as: 'subjects' })

      Classroom.hasMany(models.ClassroomSubject, { foreignKey: 'classroomId', as: 'classroomSubjects' })
    }
  }
  Classroom.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Classroom',
  });
  return Classroom;
};