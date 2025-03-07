const express = require('express');
const cors = require('cors');
const Venta = require('./models/Venta');

const app = express();

// Configuración CORS más explícita
app.use(cors({
  origin: '*', // En producción, especifica el dominio exacto
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Middleware para logging de solicitudes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rutas para la colección Ventas
app.get('/api/ventas', async (req, res) => {
  try {
    const ventas = await Venta.find().sort({ fecha: -1 });
    res.json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las ventas' });
  }
});

app.post('/api/ventas', async (req, res) => {
  console.log('Datos recibidos:', req.body);
  
  const { nombre, producto } = req.body;
  
  if (!nombre || !producto) {
    return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
  }
  
  try {
    const nuevaVenta = new Venta({
      nombre,
      producto
    });
    
    const ventaGuardada = await nuevaVenta.save();
    console.log('Venta guardada:', ventaGuardada);
    res.status(201).json(ventaGuardada);
  } catch (error) {
    console.error('Error al guardar la venta:', error);
    res.status(500).json({ mensaje: 'Error al crear la venta' });
  }
});

// Ruta para verificar si el servidor está funcionando
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', mensaje: 'API funcionando correctamente' });
});

module.exports = app;