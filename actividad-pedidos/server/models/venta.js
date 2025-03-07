const mongoose = require('mongoose');

const VentaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  producto: {
    type: String,
    required: true,
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ventas', VentaSchema);