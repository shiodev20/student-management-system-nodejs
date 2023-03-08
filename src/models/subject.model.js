'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subject.hasMany(models.Teacher, { foreignKey: 'subjectId', as: 'teachers' })

      // Subject.hasMany(models.ClassroomSubject, { foreignKey: 'subjectId', as: 'classroomSubjects'})
      // Subject.belongsToMany(models.Classroom, { through: models.ClassroomSubject, foreignKey: 'subjectId', as: 'classrooms' })

      Subject.hasMany(models.TeachingAssignment, { foreignKey: 'subjectId', as: 'teachingAssignment' })
      Subject.hasMany(models.Mark, { foreignKey: 'subjectId', as: 'marks' })
      Subject.belongsToMany(models.Classroom, { through: models.TeachingAssignment, foreignKey: 'subjectId', as: 'classrooms' })
      Subject.belongsToMany(models.Teacher, { through: models.TeachingAssignment, foreignKey: 'subjectId', as: 'subjectTeacher' })


    }
  }
  Subject.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    coefficient: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Subject',
  });
  return Subject;
};