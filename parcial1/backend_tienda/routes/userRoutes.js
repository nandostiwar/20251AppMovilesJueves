const express = require('express');
const router = express.Router(); // Inicializar el router
const Order = require('../models/Order');

// Endpoint para crear un pedido
router.post('/create-order', async (req, res) => {
    const { userId, product, amount } = req.body;

    try {
        // Validar que todos los campos requeridos estén presentes
        if (!userId) {
            return res.status(400).json({ error: 'User ID is missing' });
        }
        if (!product) {
            return res.status(400).json({ error: 'Product name is missing' });
        }
        if (!amount || isNaN(amount)) {
            return res.status(400).json({ error: 'Invalid or missing amount' });
        }

        // Crear el pedido
        const order = new Order({ userId, product, amount });
        await order.save();

        // Respuesta exitosa
        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error('Error creating order:', error);

        // Mensajes de error específicos
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation failed. Check your input data.' });
        }
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Duplicate entry detected. Please check your data.' });
        }

        // Error genérico
        res.status(500).json({ error: 'An unexpected error occurred while creating the order' });
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

// Endpoint para actualizar el estado de un pedido
router.put('/update-order/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order' });
    }
});

module.exports = router;