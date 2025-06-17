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
  //doctor_id: {
    //type: DataTypes.INTEGER,
    //allowNull: false,
    //references: {
      //model: 'usuarios', // minúsculas y plural
      //key: 'id'
    //},
    //onDelete: 'SET NULL' // o 'CASCADE' según tu lógica
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
  tableName: 'admisiones', // fuerza el nombre plural si es necesario
  timestamps: true,
  underscored: true
});

Admision.associate = (models) => {
  Admision.hasOne(models.AsignacionCama, { foreignKey: 'admision_id' });
  models.AsignacionCama.belongsTo(Admision, { foreignKey: 'admision_id' });
};

module.exports = Admision;