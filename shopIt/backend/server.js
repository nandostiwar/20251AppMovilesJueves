// server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log(err));

// Rutas
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/venta', require('./routes/ventaRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));