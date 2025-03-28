const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: String }, // Hacemos el userId opcional
    product: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    date: { type: Date, default: Date.now },
    paymentInfo: {
        cardNumber: { type: String },
        expirationDate: { type: String },
        cvv: { type: String }
    }
});

module.exports = mongoose.model('Order', orderSchema, 'orders');