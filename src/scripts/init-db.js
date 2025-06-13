const {
  sequelize,
  Usuario,
  Paciente,
  Ala,
  Habitacion,
  Cama,
} = require("../models");
const bcrypt = require("bcryptjs");

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await sequelize.sync({ force: true });
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("Base de datos sincronizada");

    const usuarios = [
      {
        username: "admin",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
        full_name: "Administrador Principal",
        email: "admin@hospital.com",
      },
      {
        username: "doctor1",
        password: await bcrypt.hash("doctor123", 10),
        role: "doctor",
        full_name: "Dr. Juan Pérez",
        email: "doctor1@hospital.com",
      },
      {
        username: "enfermero1",
        password: await bcrypt.hash("enfermero123", 10),
        role: "enfermero",
        full_name: "Enf. Marío García",
        email: "enfermero1@hospital.com",
      },
      {
        username: "recepcion1",
        password: await bcrypt.hash("recepcion123", 10),
        role: "recepcionista",
        full_name: "Recepcionista Ana López",
        email: "reception1@hospital.com",
      },
    ];

    await Usuario.bulkCreate(usuarios);

    await Paciente.bulkCreate([
      {
        dni: "12345678",
        nombre: "Juan",
        apellido: "Gómez",
        fecha_nacimiento: "1980-05-15",
        sexo: "M",
        direccion: "Calle Falsa 123",
        telefono: "555-1234",
        email: "juan@example.com",
      },
    ]);

    await Ala.bulkCreate([
      { nombre: "Medicina General", especialidad: "medicina interna" },
      { nombre: "Cirugía", especialidad: "cirugía" },
      { nombre: "Terapia Intensiva", especialidad: "uci" },
    ]);

    const alas = await Ala.findAll();
    for (const ala of alas) {
      for (let i = 1; i <= 10; i++) {
        const habitacion = await Habitacion.create({
          ala_id: ala.id,
          numero: `${ala.nombre.substring(0, 3).toUpperCase()}-${i}`,
          cantidad_camas: i % 3 === 0 ? 2 : 1, // 1/3 de habitaciones dobles
        });

        for (let j = 1; j <= habitacion.cantidad_camas; j++) {
          await Cama.create({
            habitacion_id: habitacion.id,
            numero: j,
            estado: "libre",
          });
        }
      }
    }

    console.log("Datos iniciales creados");
    process.exit(0);
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
    process.exit(1);
  }
})();
