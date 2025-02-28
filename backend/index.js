// backend/server.js
const express = require('express');
const cors = require('cors');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/pedidos', pedidoRoutes);

// Configuración del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
