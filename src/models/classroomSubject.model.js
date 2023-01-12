'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClassroomSubject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ClassroomSubject.belongsTo(models.Classroom, { foreignKey: 'classroomId' })
      // ClassroomSubject.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subjects' })

      ClassroomSubject.belongsTo(models.Classroom, { foreignKey: 'classroomId', as: 'classroom' })
      
      ClassroomSubject.belongsToMany(models.Teacher, { through: models.TeachingAssignment, foreignKey: 'classroomSubjectId' , as: 'subjectTeacher' })
    }
  }
  ClassroomSubject.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'ClassroomSubject',
  });
  return ClassroomSubject;
};