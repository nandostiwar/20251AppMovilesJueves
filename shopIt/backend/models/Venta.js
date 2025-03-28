const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  producto: { type: String, required: true },
  valor: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  estado: { type: String, enum: ['aceptada', 'rechazada'], default: 'aceptada' }
});

module.exports = mongoose.model('Venta', ventaSchema);