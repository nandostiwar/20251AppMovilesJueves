const express = require('express');
const { newAdmin, login } = require('../controllers/adminController');

const router = express.Router();

router.post('/register', newAdmin);
router.post('/login', login);

module.exports = router;