const express = require('express');
const router = express.Router();
const { obtenerArticulos, crearArticulo, actualizarArticulo, borrarArticulo } = require('../controllers/productController');
const verificarToken = require('../middleware/authMiddleware');

router.get('/', obtenerArticulos);
router.post('/', verificarToken, crearArticulo);
router.put('/:id', verificarToken, actualizarArticulo);
router.delete('/:id', verificarToken, borrarArticulo);

module.exports = router;