import Venta from '../models/Venta.js';

export const crearVenta = async (req, res) => {
    try {
        const venta = await Venta.create({ 
            usuario: req.user._id,
            ...req.body
        });
        res.status(201).json(venta);
    } catch (error) {
        console.error('Error al crear venta:', error);
        res.status(400).json({ message: 'Error al registrar la compra' });
    }
};

export const obtenerMisCompras = async (req, res) => {
    try {
        const ventas = await Venta.find({ usuario: req.user._id });
        res.json(ventas);
    } catch (error) {
        console.error('Error al obtener compras:', error);
        res.status(500).json({ message: 'Error al obtener las compras' });
    }
};

export const obtenerTodasLasCompras = async (req, res) => {
    try {
        const ventas = await Venta.find().populate('usuario', 'correo');
        res.json(ventas);
    } catch (error) {
        console.error('Error al obtener todas las compras:', error);
        res.status(500).json({ message: 'Error al obtener las compras' });
    }
};

export const actualizarEstadoCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        
        if (!['completada', 'declinada'].includes(estado)) {
            return res.status(400).json({ message: 'Estado no válido' });
        }
        
        const venta = await Venta.findByIdAndUpdate(
            id,
            { estado },
            { new: true }
        );
        
        if (!venta) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }
        
        res.json(venta);
    } catch (error) {
        console.error('Error al actualizar el estado:', error);
        res.status(500).json({ message: 'Error al actualizar el estado de la compra' });
    }
};
