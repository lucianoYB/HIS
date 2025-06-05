const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ala = sequelize.define('Ala', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especialidad: {
    type: DataTypes.ENUM('medicina interna', 'cirugía', 'uci'),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'alas', // fuerza el nombre plural si es necesario
  timestamps: true,
  underscored: true
});

module.exports = Ala;