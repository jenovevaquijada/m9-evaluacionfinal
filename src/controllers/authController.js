const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const registrarUsuario = async (req, res) => {
    const { nombre_usuario, email, password } = req.body;

    if (!nombre_usuario || !email || !password) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "El formato del correo no es válido" });
    }

    try {
        const usuarioExistente = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        
        if (usuarioExistente.rows.length > 0) {
            return res.status(400).json({ error: "Este correo electrónico ya está registrado" });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const query = 'INSERT INTO usuarios (nombre_usuario, email, password_hash) VALUES ($1, $2, $3) RETURNING id, nombre_usuario, email';
        const result = await pool.query(query, [nombre_usuario, email, passwordHash]);
        
        res.status(201).json({ 
            mensaje: "¡Usuario creado con éxito!", 
            usuario: result.rows[0] 
        });

    } catch (error) {
        console.error("Error en el registro:", error.message);
        res.status(500).json({ error: "Error interno del servidor al procesar el registro" });
    }
};

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const usuario = result.rows[0];

        const passwordCorrecto = await bcrypt.compare(password, usuario.password_hash);

        if (!passwordCorrecto) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            mensaje: "¡Bienvenido de nuevo!",
            token,
            usuario: { id: usuario.id, nombre: usuario.nombre_usuario, email: usuario.email }
        });

    } catch (error) {
        console.error("Error en login:", error.message);
        res.status(500).json({ error: "Error interno en el servidor" });
    }
};

module.exports = {
    registrarUsuario,
    loginUsuario
};