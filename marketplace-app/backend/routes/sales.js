const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// Create new sale
router.post('/', async (req, res) => {
  try {
    const sale = new Sale(req.body);
    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user sales
router.get('/user/:userId', async (req, res) => {
  try {
    const sales = await Sale.find({ userId: req.params.userId });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all sales (for admin)
router.get('/all', async (req, res) => {
  try {
    const sales = await Sale.find().populate('userId', 'email');
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;