import { useState, useEffect } from 'react';

const PedidoTabla = () => {
    const [pedidos, setPedidos] = useState([]);

    const cargarPedidos = async () => {
        const response = await fetch('http://localhost:5000/api/ventas');
        const data = await response.json();
        setPedidos(data);
    };

    useEffect(() => {
        cargarPedidos();
    }, []);

    return (
        <div>
            <button onClick={cargarPedidos}>Actualizar</button>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Nombre</th>
                        <th>Pedido</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((p, index) => (
                        <tr key={index}>
                            <td>{new Date(p.fechaCreacion).toLocaleString()}</td>
                            <td>{p.nombre}</td>
                            <td>{p.pedido}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PedidoTabla;
