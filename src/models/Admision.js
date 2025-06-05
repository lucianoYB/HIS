const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Admision = sequelize.define('Admision', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  paciente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pacientes', // minúsculas y plural
      key: 'id'
    }
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios', // minúsculas y plural
      key: 'id'
    }
  },
  fecha_admision: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  tipo: {
    type: DataTypes.ENUM('programado', 'emergencia', 'derivado'),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('activo', 'cancelado', 'dado de alta'),
    allowNull: false,
    defaultValue: 'activo'
  },
  motivo: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true,
  underscored: true
});

module.exports = Admision;