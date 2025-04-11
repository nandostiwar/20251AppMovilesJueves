import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, ShoppingCart } from 'lucide-react';

const UserDashboard = () => {
  const [compras, setCompras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/');

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
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Panel del Usuario</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Salir
        </button>
      </div>

      {/* Historial */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Historial de Compras</h2>
          <Link
            to="/payment-form"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <ShoppingCart size={18} />
            Realizar Compra
          </Link>
        </div>

        {compras.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 border-b">Fecha</th>
                  <th className="py-3 px-4 border-b">Producto</th>
                  <th className="py-3 px-4 border-b">Valor</th>
                  <th className="py-3 px-4 border-b">Estado</th>
                </tr>
              </thead>
              <tbody>
                {compras.map((compra) => (
                  <tr key={compra._id} className="hover:bg-gray-50 transition">
                    <td className="py-2 px-4 border-b">{new Date(compra.fecha).toLocaleString()}</td>
                    <td className="py-2 px-4 border-b">{compra.producto}</td>
                    <td className="py-2 px-4 border-b">${compra.valor}</td>
                    <td className={`py-2 px-4 border-b font-medium ${
                      compra.estado === 'aceptada'
                        ? 'text-green-600'
                        : 'text-red-500'
                    }`}>
                      {compra.estado}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No hay compras registradas.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
