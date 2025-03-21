import { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardUser = () => {
    const [compras, setCompras] = useState([]);
    const [producto, setProducto] = useState('');
    const [valor, setValor] = useState('');

    useEffect(() => {
        fetchCompras();
    }, []);

    const fetchCompras = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/ventas/mis-compras', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setCompras(res.data);
    };

    const handleCompra = async () => {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/ventas/nueva', { producto, valor }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchCompras();
    };

    return (
        <div>
            <h2>Mis Compras</h2>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Producto</th>
                        <th>Valor</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {compras.map((c) => (
                        <tr key={c._id}>
                            <td>{new Date(c.fecha).toLocaleDateString()}</td>
                            <td>{c.producto}</td>
                            <td>${c.valor}</td>
                            <td>{c.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Realizar una Compra</h3>
            <input type="text" placeholder="Producto" onChange={(e) => setProducto(e.target.value)} />
            <input type="number" placeholder="Valor" onChange={(e) => setValor(e.target.value)} />
            <button onClick={handleCompra}>Comprar</button>
        </div>
    );
};

export default DashboardUser;
