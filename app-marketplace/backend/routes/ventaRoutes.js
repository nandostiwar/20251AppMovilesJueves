import express from 'express';
import { crearVenta, obtenerMisCompras, obtenerTodasLasCompras, actualizarEstadoCompra } from '../controllers/ventaController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/nueva', protect, crearVenta);
router.get('/mis-compras', protect, obtenerMisCompras);
router.get('/todas', protect, obtenerTodasLasCompras);
router.put('/:id', protect, actualizarEstadoCompra);

export default router;
