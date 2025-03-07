import { useState } from 'react';

const PedidoForm = ({ onPedidoAgregado }) => {
    const [nombre, setNombre] = useState('');
    const [pedido, setPedido] = useState('');

    const enviarPedido = async () => {
        const response = await fetch('http://localhost:5000/api/ventas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, pedido }),
        });

        if (response.ok) {
            setNombre('');
            setPedido('');
            onPedidoAgregado();
        }
    };

    return (
        <div>
            <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
            <input type="text" placeholder="Pedido" value={pedido} onChange={e => setPedido(e.target.value)} />
            <button onClick={enviarPedido}>Enviar</button>
        </div>
    );
};

export default PedidoForm;
