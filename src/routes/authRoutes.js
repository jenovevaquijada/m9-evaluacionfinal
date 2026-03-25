const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/authController');

router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);

module.exports = router;

const verificarToken = require('../middleware/authMiddleware');

router.post('/register', registrarUsuario);

router.post('/login', loginUsuario);

router.get('/perfil', verificarToken, (req, res) => {
    res.json({ mensaje: "Bienvenida a tu perfil privado", usuario: req.usuario });
});