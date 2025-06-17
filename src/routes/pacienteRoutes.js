const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');


router.get('/create', pacienteController.createForm);

router.post('/create', pacienteController.create);


router.get('/', pacienteController.list);


router.get('/:id', pacienteController.show);


router.get('/:id/edit', pacienteController.editForm);


router.post('/:id/edit', pacienteController.update);

module.exports = router;