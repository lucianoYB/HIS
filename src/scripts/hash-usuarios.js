const { Usuario } = require("../models");
const bcrypt = require("bcryptjs");

(async () => {
  const usuarios = await Usuario.findAll();
  for (const user of usuarios) {
    // Si la contraseña no está hasheada (no empieza con $2)
    if (!user.password.startsWith("$2")) {
      user.password = await bcrypt.hash(user.password, 10);
      await user.save();
      console.log(`Contraseña actualizada para: ${user.username}`);
    }
  }
  console.log("Actualización de contraseñas completada.");
  process.exit(0);
})();