const express = require('express');
const router = express.Router();
const admisionController = require('../controllers/admisionController');


router.get('/create', admisionController.createForm);


router.post('/create', admisionController.create);


router.get('/', admisionController.list);


router.get('/:id', admisionController.show);


router.get('/:id/asignar-cama', admisionController.asignarCamaForm);


router.post('/:id/asignar-cama', admisionController.asignarCama);


router.post('/:id/cancelar', admisionController.cancelar);


router.post('/:id/alta', admisionController.darDeAlta);


module.exports = router;


exports.create = async (req, res) => {
  try {
   
    req.flash('success', 'Admisión creada correctamente');
    res.redirect('/admisiones');
  } catch (error) {
    req.flash('error', 'Error al crear admisión');
    res.redirect('/admisiones/create');
  }
};