'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mark.belongsTo(models.Year, { foreignKey: 'yearId', as: 'year' })
      Mark.belongsTo(models.Semester, { foreignKey: 'semesterId', as: 'semester' })
      Mark.belongsTo(models.Classroom, { foreignKey: 'classroomId', as: 'classroom' })
      Mark.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' })
      Mark.belongsTo(models.Student, { foreignKey: 'studentId', as: 'student' })
      Mark.belongsTo(models.MarkType, { foreignKey: 'markTypeId', as: 'markType' })
    }
  }
  Mark.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    mark: {
      type: DataTypes.DECIMAL(3, 1),
      defaultValue: 0,
      allowNull: false,
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Mark',
  });
  return Mark;
};