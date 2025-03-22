import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const register = async (req, res) => {
    try {
      const { correo, password, role } = req.body; // ✅ Cambiar 'email' por 'correo'
  
      // Verifica si se recibió un password válido
      if (!password) {
        return res.status(400).json({ message: 'La contraseña es obligatoria' });
      }
  
      // Verifica si el usuario ya existe
      const userExists = await User.findOne({ correo }); // ✅ Buscar por 'correo'
      if (userExists) {
        return res.status(400).json({ message: 'El usuario ya está registrado' });
      }
  
      // ✅ Asegura que se envíe el rol (si no, asigna 'user' por defecto)
      const userRole = role || 'user';
  
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crea el usuario
      const user = await User.create({
        correo, // ✅ Guardar 'correo' en la base de datos
        password: hashedPassword,
        role: userRole
      });
  
      res.status(201).json({ message: 'Usuario registrado con éxito', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al registrar usuario', error });
    }
  };
  

  export const login = async (req, res) => {
    try {
      const { correo, password } = req.body;
  
      // Buscar usuario por correo
      const user = await User.findOne({ correo });
  
      // Si el usuario no existe
      if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }
  
      // Comparar contraseñas
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
  
      // Generar token
      const token = generateToken(user.id, user.role);
  
      res.json({ token, role: user.role });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor", error });
    }
  };
  
  