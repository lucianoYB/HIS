const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'doctor', 'enfermero', 'receptionista'),
    allowNull: false
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
});

// Hook para hashear antes de crear
Usuario.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

// Hook para hashear antes de actualizar (solo si cambió la contraseña)
Usuario.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

Usuario.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Usuario;