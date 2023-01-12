'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Teacher.hasMany(models.Classroom, { foreignKey: 'headTeacherId', as: 'getHeadingClassroom' })

      Teacher.belongsTo(models.Account, { foreignKey: 'accountId', as: 'account' })
      Teacher.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' })

      // Teacher.hasMany(models.TeachingAssignment, { foreignKey: 'subjectTeacherId', as: 'teachingAssignment' })
      Teacher.belongsToMany(models.ClassroomSubject, { through: models.TeachingAssignment, foreignKey: 'subjectTeacherId', as: 'assignClassroom'})
    }
  }
  Teacher.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('gender')
        return rawValue == 1 ? 'Nam' : 'Nữ'
      }
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Teacher',
  });
  return Teacher;
};