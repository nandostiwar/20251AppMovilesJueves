import mongoose from 'mongoose';

const ventaSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    producto: { type: String, required: true },
    valor: { type: Number, required: true },
    estado: { type: String, enum: ['completada', 'declinada'], default: 'declinada' },
    fecha: { type: Date, default: Date.now },
    // Añadir campos para información de pago
    nombre: { type: String },
    cedula: { type: String },
    telefono: { type: String },
    metodo_pago: { type: String }
});

export default mongoose.model('Venta', ventaSchema);
