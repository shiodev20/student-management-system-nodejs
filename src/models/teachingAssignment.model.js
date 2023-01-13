'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeachingAssignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // TeachingAssignment.belongsTo(models.ClassroomSubject, { foreignKey: 'classroomSubjectId' })
      // TeachingAssignment.belongsTo(models.Teacher, { foreignKey: 'subjectTeacherId', as: 'subjectTeacher' })

      TeachingAssignment.belongsTo(models.Classroom, { foreignKey: 'classroomId', as: 'classroom' })
      TeachingAssignment.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' })
      TeachingAssignment.belongsTo(models.Teacher, { foreignKey: 'subjectTeacherId', as: 'subjectTeacher' })
    }
  }
  TeachingAssignment.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'TeachingAssignment',
  });
  return TeachingAssignment;
};