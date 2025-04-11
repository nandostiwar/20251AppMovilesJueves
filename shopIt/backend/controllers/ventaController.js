const Venta = require('../models/Venta');

// Crear una nueva venta
const newVenta = async (req, res) => {
  const { producto, valor, tarjeta } = req.body;
  const usuario = req.user.id;

  try {
    if (!usuario || !producto || !valor) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // Verifica si se proporcionaron datos válidos de tarjeta
    const tarjetaEsValida = tarjeta && tarjeta.numero && tarjeta.cvv && tarjeta.expira;

    // Define el estado según la validez de la tarjeta
    const estado = tarjetaEsValida ? 'aceptada' : 'rechazada';

    const nuevaVenta = new Venta({
      usuario,
      producto,
      valor,
      estado,
    });

    await nuevaVenta.save();
    res.status(201).json({
      message: `Venta ${estado === 'completado' ? 'procesada' : 'cancelada'} exitosamente`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la venta' });
  }
};

// Obtener el historial de ventas del usuario autenticado
const getVentas = async (req, res) => {
  try {
    const ventas = await Venta.find({ usuario: req.user.id }).populate('usuario', 'email nombre');
    res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las ventas' });
  }
};

// Obtener todas las ventas (solo administradores)
const getAllVentas = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        error: 'Acceso denegado. Solo los administradores pueden acceder a esta información.',
      });
    }

    const ventas = await Venta.find().populate('usuario', 'nombre email');
    res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las ventas' });
  }
};

module.exports = {
  newVenta,
  getVentas,
  getAllVentas,
};
