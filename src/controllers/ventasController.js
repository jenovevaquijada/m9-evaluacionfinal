const pool = require('../config/db');

const procesarCompra = async (req, res) => {
    const { items } = req.body;
    const clienteId = req.usuario.id;

    try {
        await pool.query('BEGIN'); 

        let totalVenta = 0;
        
        for (const item of items) {
            const resStock = await pool.query(
            'UPDATE articulos SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING precio', 
            [item.cantidad, item.id_articulo]
        );

            if (resStock.rowCount === 0) {
            throw new Error(`No se pudo procesar el producto ID ${item.id_articulo}. Revisa si existe o si hay stock suficiente.`);
        }

            totalVenta += resStock.rows[0].precio * item.cantidad;
        }

        const resVenta = await pool.query(
        'INSERT INTO ventas (id_usuario, total) VALUES ($1, $2) RETURNING id', 
        [clienteId, totalVenta]
        );

        await pool.query('COMMIT'); 
        res.status(201).json({ mensaje: "Venta exitosa", id_venta: resVenta.rows[0].id });

        } catch (error) {
            await pool.query('ROLLBACK');
            res.status(400).json({ error: error.message });
        }
    };

        const obtenerHistorial = async (req, res) => {
            const usuario_id = req.usuario.id; 
            try {
                const resultado = await pool.query(
                    'SELECT id, total, fecha FROM ventas WHERE id_usuario = $1 ORDER BY fecha DESC',
                    [usuario_id]
                );
                res.json(resultado.rows);
            } catch (error) {
                res.status(500).json({ error: "Error al obtener el historial" });
            }
        };

module.exports = { procesarCompra, obtenerHistorial };