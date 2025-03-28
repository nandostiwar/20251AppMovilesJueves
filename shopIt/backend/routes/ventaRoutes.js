const express = require('express');
const { newVenta, getVentas, getAllVentas } = require('../controllers/ventaController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Crear una nueva venta (protegida con autenticación)
router.post('/', authenticateToken, newVenta);

// Obtener el historial de compras del usuario autenticado (protegida con autenticación)
router.get('/', authenticateToken, getVentas);

// Obtener todas las compras realizadas (solo para administradores)
router.get('/all', authenticateToken, getAllVentas);

module.exports = router;
