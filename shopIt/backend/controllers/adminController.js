const User = require('../models/User');
const Venta = require('../models/Venta');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.newAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role: 'admin' });
    await newUser.save();
    res.status(201).json({ message: 'Admin creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el admin' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};