const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AsignacionCama = sequelize.define('AsignacionCama', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  admision_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Admisions', key: 'id' }
  },
  cama_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Camas', key: 'id' }
  },
  fecha_asignacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  fecha_liberacion: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true,
  underscored: true
});

module.exports = AsignacionCama;