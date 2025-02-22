const mongoose = require('mongoose');

const operacionSchema = new mongoose.Schema({
  number1: { type: Number, required: true },
  number2: { type: Number, required: true },
  operacion: { type: String, required: true },
  resultado: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Operacion', operacionSchema);