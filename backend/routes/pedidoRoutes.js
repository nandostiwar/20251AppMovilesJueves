const express = require('express');
const { getPedidos, addPedido } = require('../controllers/pedidoController');
const router = express.Router();

router.get('/', getPedidos);
router.post('/', addPedido);

module.exports = router;
