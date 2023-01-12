'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MarkType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MarkType.init({
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
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'MarkType',
  });
  return MarkType;
};