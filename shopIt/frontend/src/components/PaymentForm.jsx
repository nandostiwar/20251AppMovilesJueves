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

    // Validación de datos de tarjeta
    if (
      tarjeta !== '9946685421144000' ||
      vencimiento !== '06/28' ||
      ccv !== '986'
    ) {
      setErrorMessage('Datos de tarjeta inválidos');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      // Verificar si el token existe
      if (!token) {
        setErrorMessage('No hay sesión activa. Por favor inicie sesión nuevamente.');
        setLoading(false);
        navigate('/login');
        return;
      }
      
      // Verificar si los campos requeridos están completos
      if (!usuario || !producto || !valor || isNaN(parseFloat(valor))) {
        setErrorMessage('Por favor complete todos los campos correctamente');
        setLoading(false);
        return;
      }
      
      // Solo enviamos los campos que el backend espera
      const payload = {
        usuario: usuario,  // Ahora el modelo aceptará un string en lugar de un ObjectId
        producto: producto,
        valor: parseFloat(valor)
      };
      
      console.log('Datos a enviar:', payload);
      
      const response = await axios.post(
        'http://localhost:5000/api/venta',
        payload,
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      
      console.log('Respuesta del servidor:', response.data);
      
      alert('Pago realizado exitosamente');
      setLoading(false);
      navigate('/user-dashboard');
    } catch (error) {
      setLoading(false);
      console.error('Error completo:', error);
      
      // Mostrar más detalles sobre el error
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.log('Datos de respuesta del error:', error.response.data);
        console.log('Estado del error:', error.response.status);
        console.log('Cabeceras de respuesta:', error.response.headers);
        setErrorMessage(`Error del servidor: ${error.response.status}. Mensaje: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        // La solicitud se realizó pero no se recibió respuesta
        console.log('Solicitud sin respuesta:', error.request);
        setErrorMessage('No se recibió respuesta del servidor. Verifica que el servidor esté funcionando.');
      } else {
        // Ocurrió un error al configurar la solicitud
        console.log('Error de configuración:', error.message);
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
        {/* Campo para el nombre */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Nombre"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            style={{ 
              padding: '12px', 
              width: '100%', 
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        {/* Campo para la cédula */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Cédula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            required
            style={{ 
              padding: '12px', 
              width: '100%', 
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        {/* Campo para el teléfono */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            style={{ 
              padding: '12px', 
              width: '100%', 
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        {/* Campo para el número de tarjeta */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Número de tarjeta"
            value={tarjeta}
            onChange={(e) => setTarjeta(e.target.value)}
            required
            style={{ 
              padding: '12px', 
              width: '100%', 
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        {/* Campo para la fecha de vencimiento */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Fecha de vencimiento (MM/YY)"
            value={vencimiento}
            onChange={(e) => setVencimiento(e.target.value)}
            required
            style={{ 
              padding: '12px', 
              width: '100%', 
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        {/* Campo para el CCV */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="CCV"
            value={ccv}
            onChange={(e) => setCcv(e.target.value)}
            required
            style={{ 
              padding: '12px', 
              width: '100%', 
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        {/* Campo para el nombre del producto */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Nombre del producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            required
            style={{ 
              padding: '12px', 
              width: '100%', 
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        {/* Campo para el valor del producto */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="number"
            placeholder="Valor del producto"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
            style={{ 
              padding: '12px', 
              width: '100%', 
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        {/* Botón de pagar */}
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '12px 20px',
            backgroundColor: loading ? '#cccccc' : '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%',
            fontSize: '16px'
          }}
        >
          {loading ? 'Procesando...' : 'Pagar'}
        </button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <a 
          href="/user-dashboard" 
          style={{ 
            textDecoration: 'none', 
            color: '#2196f3',
            fontWeight: 'bold'
          }}
        >
          Volver al panel
        </a>
      </div>
    </div>
  );
};

export default PaymentForm;