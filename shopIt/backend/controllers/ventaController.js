const Venta = require('../models/Venta');

// Crear una nueva venta
exports.newVenta = async (req, res) => {
  const { producto, valor } = req.body;
  const usuario = req.user.id;

  try {
    if (!usuario || !producto || !valor) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const nuevaVenta = new Venta({ usuario, producto, valor });
    await nuevaVenta.save();
    res.status(201).json({ message: 'Venta creada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la venta' });
  }
};

// Obtener el historial de ventas del usuario autenticado
exports.getVentas = async (req, res) => {
  try {
    const ventas = await Venta.find({ usuario: req.user.id }).populate('usuario', 'email');
    res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las ventas' });
  }
};

// Obtener todas las ventas (solo administradores)
exports.getAllVentas = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado. Solo los administradores pueden acceder a esta información.' });
    }

    const ventas = await Venta.find().populate('usuario', 'email');
    res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las ventas' });
  }
};
