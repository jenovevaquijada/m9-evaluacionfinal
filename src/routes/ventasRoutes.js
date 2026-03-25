const express = require('express');
const router = express.Router();
const { procesarCompra, obtenerHistorial } = require('../controllers/ventasController');
const verificarToken = require('../middleware/authMiddleware');

router.post('/', verificarToken, procesarCompra);
router.get('/usuario', verificarToken, obtenerHistorial);

module.exports = router;