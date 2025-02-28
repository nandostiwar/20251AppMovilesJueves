import React, { useState, useEffect } from 'react';
import PedidoForm from './components/PedidoForm';
import PedidoList from './components/PedidoList';

function App() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pedidos');
        if (!response.ok) throw new Error('Error al obtener pedidos');

        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <div className="App">
      <h1>Aplicación de Pedidos</h1>
      <PedidoForm onPedidoCreated={setPedidos} />
      <PedidoList pedidos={pedidos} />
    </div>
  );
}

export default App;
