import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [compras, setCompras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          navigate('/');
          return;
        }

        // Obtener el historial de compras del usuario autenticado
        const response = await axios.get('http://localhost:5000/api/venta', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCompras(response.data);
      } catch (error) {
        alert('Error al cargar las compras');
        navigate('/');
      }
    };
    fetchCompras();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token
    navigate('/'); // Redirige al login
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Panel de Usuario</h2>

      {/* Botón de Salir */}
      <button 
        onClick={handleLogout} 
        style={{ 
          position: 'absolute', 
          top: '20px', 
          right: '20px', 
          padding: '10px 15px', 
          backgroundColor: 'red', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer'
        }}
      >
        Salir
      </button>

      {/* Cuadro con el historial de compras */}
      <div style={{
        border: '1px solid black',
        padding: '20px',
        margin: '20px auto',
        width: '80%',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px'
      }}>
        <h3>Historial de Compras</h3>
        {compras.length > 0 ? (
          <table style={{ margin: '20px auto', borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '10px' }}>Fecha</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Producto</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Valor</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {compras.map((compra) => (
                <tr key={compra._id}>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{new Date(compra.fecha).toLocaleString()}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{compra.producto}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{compra.valor}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{compra.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay compras registradas.</p>
        )}
      </div>

      {/* Botón "Realizar Compra" */}
      <Link to="/payment-form">
        <button style={{ padding: '10px 20px' }}>Realizar Compra</button>
      </Link>
    </div>
  );
};

export default UserDashboard;
