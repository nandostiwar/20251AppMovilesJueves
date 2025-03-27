const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Endpoint para crear un pedido
router.post('/create-order', async (req, res) => {
    const { userId, product, amount } = req.body;

    try {
        const order = new Order({ userId, product, amount });
        await order.save();
        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Endpoint para obtener los pedidos de un usuario específico
router.get('/user-orders/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ userId }).sort({ date: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

module.exports = router;