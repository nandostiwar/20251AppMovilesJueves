const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Endpoint para obtener todos los pedidos (para el admin)
router.get('/all-orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'email').sort({ date: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

module.exports = router;