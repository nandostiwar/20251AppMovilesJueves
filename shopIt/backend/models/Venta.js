const mongoose = require('mongoose');
const { verifyToken } = require('../middleware/authMiddleware');

const ventaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  producto: { type: String, required: true },
  valor: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  estado: { type: String, enum: ['pendiente', 'aceptada', 'rechazada'], default: 'pendiente' }
});

module.exports = mongoose.model('Venta', ventaSchema);