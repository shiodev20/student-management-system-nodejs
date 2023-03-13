'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.Account, { foreignKey: 'accountId', as: 'account' })
      Employee.belongsTo(models.Role, { foreignKy: 'roleId', as: 'role' })
    }
  }
  Employee.init({
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
    modelName: 'Employee',
  });
  return Employee;
};