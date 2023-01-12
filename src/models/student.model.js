'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Student.belongsToMany(models.Classroom, { through: models.ClassroomDetail, as: 'classrooms'})

    }
  }
  Student.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING(10),
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
    parentName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parentPhone: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    enrollDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Student',
  });
  return Student;
};