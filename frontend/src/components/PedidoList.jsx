// src/components/PedidoList.jsx
import React from 'react';

const PedidoList = ({ pedidos }) => {
  return (
    <div>
      <h2>Lista de Pedidos</h2>
      <ul>
        {pedidos.length > 0 ? (
          pedidos.map((pedido, index) => (
            <li key={index}>{pedido}</li>
          ))
        ) : (
          <p>No hay pedidos aún.</p>
        )}
      </ul>
    </div>
  );
};

export default PedidoList;

