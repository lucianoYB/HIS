const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Habitacion = sequelize.define('Habitacion', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ala_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'alas', key: 'id' }, // minúsculas y plural
    onDelete: 'CASCADE'
  },
  numero: { type: DataTypes.STRING, allowNull: false },
  cantidad_camas: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 2 } }
}, {
  tableName: 'habitaciones', // minúsculas y plural
  timestamps: true,
  underscored: true
});

module.exports = Habitacion;