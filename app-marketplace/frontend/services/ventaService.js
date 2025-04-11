import axios from 'axios';

const API_URL = 'https://parcial-backend-theta.vercel.app/api/ventas';

const getMisCompras = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API_URL}/mis-compras`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

// Actualización para incluir todos los datos de compra
const nuevaCompra = async (datosCompra) => {
    console.log("Enviando al backend:", datosCompra);
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/nueva`, datosCompra, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

const getTodasLasCompras = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API_URL}/todas`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

// Función para validar estados
const validarEstado = (estado) => {
    const estadosValidos = ['completada', 'declinada'];
    if (!estadosValidos.includes(estado)) {
        console.warn(`Estado no válido: ${estado}. Usando 'declinada' por defecto.`);
        return 'declinada';
    }
    return estado;
};

const actualizarEstadoCompra = async (id, estado) => {
    const token = localStorage.getItem('token');
    const estadoValidado = validarEstado(estado);
    
    console.log(`Actualizando compra ${id} a estado ${estadoValidado}`);
    
    const response = await axios.put(`${API_URL}/${id}`, { estado: estadoValidado }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    
    return response.data;
};

// Función para obtener estadísticas de compras
const obtenerEstadisticas = (compras) => {
    const total = compras.length;
    const completadas = compras.filter(c => c.estado === 'completada').length;
    const declinadas = compras.filter(c => c.estado === 'declinada').length;
    
    const valorTotal = compras
        .filter(c => c.estado === 'completada')
        .reduce((sum, c) => sum + Number(c.valor), 0);
    
    return {
        total,
        completadas,
        declinadas,
        valorTotal
    };
};

const ventaService = { 
    getMisCompras, 
    nuevaCompra, 
    getTodasLasCompras, 
    actualizarEstadoCompra,
    obtenerEstadisticas,
    validarEstado
};

export default ventaService;
