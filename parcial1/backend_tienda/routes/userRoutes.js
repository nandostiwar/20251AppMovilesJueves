const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Endpoint para obtener los pedidos de un usuario específico
router.get('/user-orders/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Buscar los pedidos asociados al userId
        const orders = await Order.find({ userId }).sort({ date: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

module.exports = router;