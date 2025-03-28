const express = require('express');
const { newUser, login } = require('../controllers/userController');

const router = express.Router();

router.post('/register', newUser);
router.post('/login', login);

module.exports = router;