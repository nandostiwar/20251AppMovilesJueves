const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

    req.user = { id: user._id, role: user.role };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = auth; // 👈 importante: exportar como función directa
