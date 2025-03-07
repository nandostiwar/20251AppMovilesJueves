import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Definir la URL base del API - cambia esto según tu configuración
// Para desarrollo local sin túnel:
const API_URL = 'http://localhost:5000/api';
// Para usar con tu túnel:
// const API_URL = 'https://t12mn3p6-5000.use2.devtunnels.ms/api';

// Configuración global de Axios
axios.defaults.timeout = 10000; // 10 segundos

function App() {
  const [ventas, setVentas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [producto, setProducto] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [serverStatus, setServerStatus] = useState('desconocido');

  // Comprobar el estado del servidor
  const verificarServidor = async () => {
    try {
      const respuesta = await axios.get(`${API_URL}/status`);
      if (respuesta.data.status === 'ok') {
        setServerStatus('conectado');
        setError(null);
      }
    } catch (error) {
      console.error('Error al verificar el servidor:', error);
      setServerStatus('desconectado');
      setError('No se puede conectar con el servidor. Verifica que esté en ejecución.');
    }
  };

  // Obtener todas las ventas al cargar la página
  const obtenerVentas = async () => {
    setError(null);
    try {
      const respuesta = await axios.get(`${API_URL}/ventas`);
      setVentas(respuesta.data);
    } catch (error) {
      console.error('Error al obtener ventas:', error);
      setError('No se pudieron cargar las ventas. Intenta recargar la página.');
    }
  };

  useEffect(() => {
    verificarServidor();
    obtenerVentas();
    
    // Verificar el servidor cada 30 segundos
    const intervalo = setInterval(verificarServidor, 30000);
    
    return () => clearInterval(intervalo);
  }, []);

  // Agregar una nueva venta
  const agregarVenta = async (e) => {
    e.preventDefault();
    
    if (!nombre.trim() || !producto.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    setCargando(true);
    setError(null);
    
    try {
      console.log('Enviando datos:', { nombre, producto });
      console.log('URL:', `${API_URL}/ventas`);
      
      const respuesta = await axios.post(`${API_URL}/ventas`, { 
        nombre, 
        producto 
      });
      
      console.log('Respuesta:', respuesta.data);
      
      setNombre('');
      setProducto('');
      obtenerVentas(); // Recargar la lista de ventas
    } catch (error) {
      console.error('Error al agregar venta:', error);
      
      if (error.code === 'ERR_NETWORK') {
        setError('Error de conexión. Verifica que el servidor esté en ejecución y accesible.');
      } else if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        setError(`Error del servidor: ${error.response.data.mensaje || error.response.statusText}`);
      } else {
        setError('Error desconocido al agregar la venta. Intenta nuevamente.');
      }
    } finally {
      setCargando(false);
    }
  };

  // Formatear fecha para mostrar
  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    return nuevaFecha.toLocaleString();
  };

  return (
    <div className="app-container">
      <h1>Registro de Ventas</h1>
      
      {/* Indicador de estado del servidor */}
      <div className={`server-status ${serverStatus}`}>
        Estado del servidor: {serverStatus === 'conectado' ? 'Conectado' : 'Desconectado'}
      </div>
      
      {error && (
        <div className="error-message">
          {error}
          <button className="retry-button" onClick={verificarServidor}>
            Reintentar conexión
          </button>
        </div>
      )}
      
      <form onSubmit={agregarVenta} className="formulario-venta">
        <div className="form-group">
          <label htmlFor="nombre">Nombre del Cliente:</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa el nombre del cliente"
            disabled={cargando}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="producto">Producto:</label>
          <input
            id="producto"
            type="text"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            placeholder="Ingresa el producto"
            disabled={cargando}
          />
        </div>
        
        <button type="submit" disabled={cargando || serverStatus !== 'conectado'}>
          {cargando ? 'Guardando...' : 'Agregar Venta'}
        </button>
      </form>
      
      <div className="tabla-ventas">
        <h2>Ventas Registradas</h2>
        
        {ventas.length === 0 ? (
          <p className="sin-ventas">
            {error ? 'No se pudieron cargar las ventas' : 'No hay ventas registradas todavía'}
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Producto</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta._id}>
                  <td>{venta.nombre}</td>
                  <td>{venta.producto}</td>
                  <td>{formatearFecha(venta.fecha)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;