const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('./mongo');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require('./routes/authRoutes');
const ventaRoutes = require('./routes/ventaRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/ventas', ventaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
