const express = require('express');
const router = express.Router();

const ventaController = require('../controllers/ventaController');
const auth = require('../middleware/authMiddleware'); // ✅ auth debe ser función

router.post('/', auth, ventaController.newVenta);
router.get('/', auth, ventaController.getVentas);
router.get('/all', auth, ventaController.getAllVentas);

module.exports = router;
