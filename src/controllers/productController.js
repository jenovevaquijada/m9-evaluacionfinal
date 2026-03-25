const pool = require('../config/db');

const obtenerArticulos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM articulos');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los artículos" });
    }
};

const crearArticulo = async (req, res) => {
    const { nombre, precio, stock } = req.body;
    const usuario_id = req.usuario.id; 

    try {
        const query = 'INSERT INTO articulos (nombre, precio, stock, usuario_id) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [nombre, precio, stock, usuario_id];
        
        const result = await pool.query(query, values);
        res.status(201).json({
            mensaje: "Artículo creado con éxito",
            articulo: result.rows[0]
        });
    } catch (error) {
        console.error("Error SQL:", error.message);
        res.status(500).json({ error: "Error al guardar: " + error.message });
    }
};

const actualizarArticulo = async (req, res) => {
    const { id } = req.params; 
    const { nombre, precio, stock } = req.body;
    const usuario_id = req.usuario.id;

    try {
        const query = 'UPDATE articulos SET nombre = $1, precio = $2, stock = $3 WHERE id = $4 AND usuario_id = $5 RETURNING *';
        const result = await pool.query(query, [nombre, precio, stock, id, usuario_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Artículo no encontrado o no tienes permiso" });
        }

        res.json({ mensaje: "Artículo actualizado", articulo: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar" });
    }
};

const borrarArticulo = async (req, res) => {
    const { id } = req.params;
    const usuario_id = req.usuario.id;

    try {
        const query = 'DELETE FROM articulos WHERE id = $1 AND usuario_id = $2 RETURNING *';
        const result = await pool.query(query, [id, usuario_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se pudo borrar: El artículo no existe o no eres el dueño" });
        }

        res.json({ mensaje: "Artículo eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
};

module.exports = { obtenerArticulos, crearArticulo, actualizarArticulo, borrarArticulo };