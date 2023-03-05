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

      Student.hasMany(models.ClassroomDetail, { foreignKey: 'studentId', as: 'classroomDetails' })
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
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      // get() {
      //   const rawDob = new Date(this.getDataValue('dob'))
      //   const day = rawDob.getDate() < 10 ? `0${rawDob.getDate()}` : rawDob.getDate()
      //   const month = rawDob.getMonth() + 1 < 10 ? `0${rawDob.getMonth() + 1}` : rawDob.getMonth() + 1
      //   const year  = rawDob.getFullYear()

      //   return `${day}-${month}-${year}`
      // }
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
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`
      }
    },
    genderText: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('gender') == 1 ? 'Nam' : 'Nữ'
      }
    },
    formatDob: {
      type: DataTypes.VIRTUAL,
      get() {
        const rawDob = new Date(this.getDataValue('dob'))
        const day = rawDob.getDate() < 10 ? `0${rawDob.getDate()}` : rawDob.getDate()
        const month = rawDob.getMonth() + 1 < 10 ? `0${rawDob.getMonth() + 1}` : rawDob.getMonth() + 1
        const year  = rawDob.getFullYear()

        return `${day}-${month}-${year}`
      }
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Student',
  });
  return Student;
};