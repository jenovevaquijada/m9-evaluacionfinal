const express = require('express');
const cors = require('cors'); 
const path = require('path'); 
const app = express();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const ventasRoutes = require('./routes/ventasRoutes');

app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());
app.use(express.json()); 

app.use('/api/auth', authRoutes); 
app.use('/api/articulos', productRoutes);
app.use('/api/ventas', ventasRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));