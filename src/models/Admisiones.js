const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Admisiones = sequelize.define('Admisiones', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  paciente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Pacientes', // nombre de la tabla asociada
      key: 'id'
    }
  },
  fecha_admision: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  tipo: {
    type: DataTypes.ENUM('programmed', 'emergency', 'referral'),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('active', 'discharged', 'cancelled'),
    allowNull: false,
    defaultValue: 'active'
  },
  motivo: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true,
  underscored: true
});

module.exports = Admisiones;