const sequelize = require('../config/db');
const Usuario = require('../models/Usuario');

(async () => {
  try {
    
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Base de datos sincronizada');
    
    
    await Usuario.bulkCreate([
      {
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        full_name: 'Administrador Principal',
        email: 'admin@hospital.com'
      },
      {
        username: 'doctor1',
        password: 'doctor123',
        role: 'doctor',
        full_name: 'Dr. Juan Pérez',
        email: 'doctor1@hospital.com'
      },
      {
        username: 'enfermero1',
        password: 'enfermero123',
        role: 'enfermero',
        full_name: 'Enf. Marío García',
        email: 'enfermero1@hospital.com'
      },
      {
        username: 'recepcion1',
        password: 'recepcion123',
        role: 'receptionista',
        full_name: 'Recepcionista Ana López',
        email: 'reception1@hospital.com'
      }
    ]);
    
    console.log('Usuarios iniciales creados');
    process.exit(0);
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  }
})();