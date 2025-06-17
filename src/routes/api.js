// src/routes/api.js
const express = require('express');
const router = express.Router();
const Cama = require('../models/Cama');
const Habitacion = require('../models/Habitacion');

Cama.belongsTo(Habitacion, { foreignKey: 'habitacion_id' }); // Asegúrate de tener esto

router.get('/camas', async (req, res) => {
  const { ala_id } = req.query;
  if (!ala_id) return res.json([]);
  const camas = await Cama.findAll({
    where: { estado: 'libre' },
    include: [{
      model: Habitacion,
      where: { ala_id }
    }]
  });
  res.json(camas.map(cama => ({
    id: cama.id,
    numero: cama.numero,
    habitacion_numero: cama.Habitacion.numero
  })));
});

module.exports = router;