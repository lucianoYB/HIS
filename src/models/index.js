const sequelize = require('../config/db');
const Usuario = require('./Usuario');
const Paciente = require('./Paciente');
const Admision = require('./Admision');
const Ala = require('./Ala');
const Habitacion = require('./Habitacion');
const Cama = require('./Cama');
const AsignacionCama = require('./AsignacionCama');


Paciente.hasMany(Admision, { foreignKey: 'paciente_id' });
Admision.belongsTo(Paciente, { foreignKey: 'paciente_id' });

Ala.hasMany(Habitacion, { foreignKey: 'ala_id' });
Habitacion.belongsTo(Ala, { foreignKey: 'ala_id' });

Habitacion.hasMany(Cama, { foreignKey: 'habitacion_id' });
Cama.belongsTo(Habitacion, { foreignKey: 'habitacion_id' });

Admision.hasOne(AsignacionCama, { foreignKey: 'admision_id' });
AsignacionCama.belongsTo(Admision, { foreignKey: 'admision_id' });

Cama.hasMany(AsignacionCama, { foreignKey: 'cama_id' });
AsignacionCama.belongsTo(Cama, { foreignKey: 'cama_id' });


Usuario.hasMany(Admision, { foreignKey: 'doctor_id' });
Admision.belongsTo(Usuario, { foreignKey: 'doctor_id' });

module.exports = {
  sequelize,
  Usuario,
  Paciente,
  Admision,
  Ala,
  Habitacion,
  Cama,
  AsignacionCama
};