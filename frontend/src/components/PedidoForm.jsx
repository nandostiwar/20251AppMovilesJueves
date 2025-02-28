import React, { useState } from 'react';

const PedidoForm = ({ onPedidoCreated }) => {
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!descripcion) {
      alert('Por favor ingresa una descripción');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descripcion }),
      });

      if (!response.ok) throw new Error('Error al agregar pedido');

      const data = await response.json();
      onPedidoCreated(data.pedidos); // Actualiza la lista de pedidos en el frontend
      setDescripcion('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción del pedido"
        required
      />
      <button type="submit">Agregar Pedido</button>
    </form>
  );
};

export default PedidoForm;
