const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['accepted', 'rejected'],
    default: 'pending'
  },
  customerInfo: {
    name: String,
    cedula: String,
    phone: String,
    cardNumber: String,
    expiryDate: String,
    cvv: String
  }
});

module.exports = mongoose.model('Sale', saleSchema);