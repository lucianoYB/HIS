const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AsignacionCama = sequelize.define('AsignacionCama', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cama_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'camas', key: 'id' }, // minúsculas y plural
    onDelete: 'CASCADE'
  },
  admision_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'admisiones', key: 'id' }, // minúsculas y plural
    onDelete: 'CASCADE'
  },
  ala_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'alas',
      key: 'id'
    }
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
  tableName: 'asignacion_camas', // minúsculas y plural
  timestamps: true,
  underscored: true
});

module.exports = AsignacionCama;