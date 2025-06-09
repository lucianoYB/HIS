const express = require('express');
const router = express.Router();
const admisionController = require('../controllers/admisionController');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, admisionController.list);
router.get('/create', authMiddleware, admisionController.createForm);
router.post('/', authMiddleware, admisionController.create);
router.get('/:id/asignar-cama', authMiddleware, admisionController.asignarCamaForm);
router.post('/:id/asignar-cama', authMiddleware, admisionController.asignarCama);
router.get('/:id', authMiddleware, admisionController.show);
router.post('/:id/cancelar', authMiddleware, admisionController.cancelar);

module.exports = router;