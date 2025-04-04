const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Asegúrate de que por defecto los usuarios nuevos sean 'user'
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      email, 
      password: hashedPassword, 
      role: 'user' 
    });
    await newUser.save();
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email,
        role: user.role 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    
    res.status(200).json({ 
      token, 
      role: user.role 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};