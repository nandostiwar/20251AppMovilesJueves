import { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardAdmin = () => {
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        fetchCompras();
    }, []);

    const fetchCompras = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/ventas/todas', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setCompras(res.data);
    };

    const actualizarEstado = async (id, estado) => {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:5000/api/ventas/${id}`, { estado }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchCompras();
    };

    return (
        <div>
            <h2>Compras de Usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Usuario</th>
                        <th>Producto</th>
                        <th>Valor</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {compras.map((c) => (
                        <tr key={c._id}>
                            <td>{new Date(c.fecha).toLocaleDateString()}</td>
                            <td>{c.usuario.correo}</td>
                            <td>{c.producto}</td>
                            <td>${c.valor}</td>
                            <td>{c.estado}</td>
                            <td>
                                <button onClick={() => actualizarEstado(c._id, 'aceptada')}>Aceptar</button>
                                <button onClick={() => actualizarEstado(c._id, 'rechazada')}>Rechazar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardAdmin;
