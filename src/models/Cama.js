const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cama = sequelize.define('Cama', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  habitacion_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'habitaciones', key: 'id' }, // minúsculas y plural
    onDelete: 'CASCADE'
  },
  numero: { type: DataTypes.STRING, allowNull: false },
  estado: {
    type: DataTypes.ENUM('libre', 'ocupada', 'en limpieza'),
    allowNull: false,
    defaultValue: 'libre'
  }
}, {
  tableName: 'camas', // minúsculas y plural
  timestamps: true,
  underscored: true
});

module.exports = Cama;