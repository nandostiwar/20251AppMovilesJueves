import axios from 'axios';

const API_URL = 'http://localhost:5000/api/ventas';

const getMisCompras = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API_URL}/mis-compras`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

const nuevaCompra = async (producto, valor) => {
    const token = localStorage.getItem('token');
    return axios.post(`${API_URL}/nueva`, { producto, valor }, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

const getTodasLasCompras = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API_URL}/todas`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

const actualizarEstadoCompra = async (id, estado) => {
    const token = localStorage.getItem('token');
    return axios.put(`${API_URL}/${id}`, { estado }, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

const ventaService = { getMisCompras, nuevaCompra, getTodasLasCompras, actualizarEstadoCompra };
export default ventaService;
