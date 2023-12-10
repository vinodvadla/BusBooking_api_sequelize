'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    static associate(models) {
      Bus.hasMany(models.Seat)
      Bus.hasMany(models.Booking)
    }
  }
  Bus.init({
    name: DataTypes.STRING,
    busNo: DataTypes.STRING,
    totalSeats: DataTypes.INTEGER,
    availableSets: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bus',
  });
  return Bus;
};
