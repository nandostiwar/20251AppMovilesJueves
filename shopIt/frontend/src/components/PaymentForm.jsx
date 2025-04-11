import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const [usuario, setUsuario] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tarjeta, setTarjeta] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [ccv, setCcv] = useState('');
  const [producto, setProducto] = useState('');
  const [valor, setValor] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('No hay sesión activa. Por favor inicie sesión nuevamente.');
      setLoading(false);
      navigate('/login');
      return;
    }

    if (!usuario || !producto || !valor || isNaN(parseFloat(valor))) {
      setErrorMessage('Por favor complete todos los campos correctamente');
      setLoading(false);
      return;
    }

    // Comparar los datos de tarjeta
    const tarjetaCorrecta = '9946685421144000';
    const vencimientoCorrecto = '06/28';
    const ccvCorrecto = '986';

    const estado =
      tarjeta === tarjetaCorrecta &&
      vencimiento === vencimientoCorrecto &&
      ccv === ccvCorrecto
        ? 'aceptada'
        : 'rechazada';

    // Construimos el payload con el estado correspondiente
    const payload = {
      usuario: usuario,
      producto: producto,
      valor: parseFloat(valor),
      estado: estado,
    };

    console.log('Datos a enviar:', payload);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/venta',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Respuesta del servidor:', response.data);

      if (estado === 'aceptada') {
        alert('Pago realizado exitosamente');
      } else {
        alert('Datos incorrectos, pero la compra fue registrada como RECHAZADA');
      }

      setLoading(false);
      navigate('/user-dashboard');
    } catch (error) {
      setLoading(false);
      console.error('Error completo:', error);

      if (error.response) {
        setErrorMessage(`Error del servidor: ${error.response.status}. Mensaje: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        setErrorMessage('No se recibió respuesta del servidor. Verifica que el servidor esté funcionando.');
      } else {
        setErrorMessage(`Error al configurar la solicitud: ${error.message}`);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', maxWidth: '500px', margin: '0 auto', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2>Formulario de Pago</h2>

      {errorMessage && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '15px',
          border: '1px solid #ef9a9a'
        }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Campos de usuario */}
        <input type="text" placeholder="Nombre" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
        <input type="text" placeholder="Cédula" value={cedula} onChange={(e) => setCedula(e.target.value)} required />
        <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        <input type="text" placeholder="Número de tarjeta" value={tarjeta} onChange={(e) => setTarjeta(e.target.value)} required />
        <input type="text" placeholder="Fecha de vencimiento (MM/YY)" value={vencimiento} onChange={(e) => setVencimiento(e.target.value)} required />
        <input type="text" placeholder="CCV" value={ccv} onChange={(e) => setCcv(e.target.value)} required />
        <input type="text" placeholder="Nombre del producto" value={producto} onChange={(e) => setProducto(e.target.value)} required />
        <input type="number" placeholder="Valor del producto" value={valor} onChange={(e) => setValor(e.target.value)} required />

        <button type="submit" disabled={loading}>
          {loading ? 'Procesando...' : 'Pagar'}
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <a href="/user-dashboard" style={{ textDecoration: 'none', color: '#2196f3', fontWeight: 'bold' }}>
          Volver al panel
        </a>
      </div>
    </div>
  );
};

export default PaymentForm;
