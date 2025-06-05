const express = require('express');
const router = express.Router();
const adimisionController = require('../controllers/adimisionController');

router.get('/', adimisionController.list);
router.get('/create', adimisionController.createForm);
router.post('/', adimisionController.create);
router.get('/:id/asignar-cama', adimisionController.asignarCamaForm);
router.post('/:id/asignar-cama', adimisionController.asignarCama);
router.get('/:id', adimisionController.show);
router.post('/:id/cancelar', adimisionController.cancelar);

module.exports = router;