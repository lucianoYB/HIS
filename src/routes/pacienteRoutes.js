const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/', pacienteController.list);
router.get('/create', pacienteController.createForm);
router.post('/', pacienteController.create);
router.get('/:id', pacienteController.show);
router.get('/:id/edit', pacienteController.editForm);
router.post('/:id', pacienteController.update);

module.exports = router;