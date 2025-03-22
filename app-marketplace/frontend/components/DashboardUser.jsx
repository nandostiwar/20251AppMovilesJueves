import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Compra from './Compra';
import ventaService from '../services/ventaService';
import ThemeContext from '../context/ThemeContext';
import authService from '../services/authService';

const DashboardUser = () => {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const [compras, setCompras] = useState([]);
    const [producto, setProducto] = useState('');
    const [valor, setValor] = useState('');
    const [mostrarFormularioPago, setMostrarFormularioPago] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCompras();
    }, []);

    const fetchCompras = async () => {
        setLoading(true);
        try {
            const data = await ventaService.getMisCompras();
            setCompras(data);
        } catch (error) {
            console.error('Error al obtener compras:', error);
            alert('Error al cargar tus compras. Por favor intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleCompra = () => {
        // Validar que los campos producto y valor no estén vacíos
        if (!producto || !valor) {
            alert('Por favor complete todos los campos');
            return;
        }
        
        // Mostrar el componente de pago
        setMostrarFormularioPago(true);
    };

    const finalizarCompra = async (datosCompra) => {
        try {
            console.log("Datos enviados:", {
                producto, 
                valor,
                ...datosCompra
            });
            
            await ventaService.nuevaCompra({
                producto, 
                valor,
                ...datosCompra // Esto incluye el estado
            });
            
            // Actualizar lista de compras
            await fetchCompras();
            
            // Limpiar formulario y volver a la vista principal
            setProducto('');
            setValor('');
            setMostrarFormularioPago(false);
            
            // Mensaje según el estado
            if (datosCompra.estado === 'completada') {
                alert("Compra realizada con éxito");
            } else {
                alert("Compra registrada como declinada");
            }
        } catch (error) {
            alert(`Error al procesar la compra: ${error.message}`);
        }
    };

    const cancelarCompra = () => {
        setMostrarFormularioPago(false);
    };

    const handleLogout = () => {
        authService.logout();
    };

    // Función para obtener el estilo según el estado
    const getEstadoStyle = (estado) => {
        switch (estado) {
            case 'completada':
                return { color: 'green', fontWeight: 'bold' };
            case 'declinada':
                return { color: 'red', fontWeight: 'bold' };
            default:
                return { color: 'gray', fontWeight: 'normal' };
        }
    };

    // Función para obtener el texto del estado
    const getEstadoText = (estado) => {
        switch (estado) {
            case 'completada':
                return 'Completada ✓';
            case 'declinada':
                return 'Declinada ✗';
            default:
                return estado || 'Desconocido';
        }
    };

    return (
        <div className={`app-container ${darkMode ? 'dark' : ''}`}>
            <div className="dashboard-header">
                <h1 className="dashboard-title">Panel de Usuario</h1>
                <div className="dashboard-actions">
                    <button onClick={toggleTheme} className="theme-button">
                        {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
                    </button>
                    <button onClick={handleLogout} className="logout-button">
                        Cerrar Sesión
                    </button>
                </div>
            </div>
            
            <div className="dashboard-content">
                {!mostrarFormularioPago ? (
                    <>
                        <div className="card purchases-card">
                            <h2 className="card-title">Mis Compras</h2>
                            
                            {loading ? (
                                <div className="loading-spinner">Cargando...</div>
                            ) : compras.length === 0 ? (
                                <div className="empty-state">
                                    <p>No tienes compras registradas aún.</p>
                                    <p>¡Realiza tu primera compra ahora!</p>
                                </div>
                            ) : (
                                <div className="table-container">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Fecha</th>
                                                <th>Producto</th>
                                                <th>Valor</th>
                                                <th>Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {compras.map((c) => (
                                                <tr key={c._id} className="purchase-row">
                                                    <td>{new Date(c.fecha).toLocaleDateString()}</td>
                                                    <td>{c.producto}</td>
                                                    <td>${c.valor}</td>
                                                    <td style={getEstadoStyle(c.estado)}>
                                                        {getEstadoText(c.estado)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        <div className="dashboard-grid">
                            <div className="card new-purchase-card">
                                <h3 className="card-title">Realizar una Compra</h3>
                                <div className="purchase-form">
                                    <div className="form-group">
                                        <label htmlFor="producto">Producto</label>
                                        <input 
                                            id="producto"
                                            type="text" 
                                            placeholder="Nombre del producto" 
                                            value={producto}
                                            onChange={(e) => setProducto(e.target.value)} 
                                            className="input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="valor">Valor</label>
                                        <input 
                                            id="valor"
                                            type="number" 
                                            placeholder="Precio" 
                                            value={valor}
                                            onChange={(e) => setValor(e.target.value)} 
                                            className="input"
                                        />
                                    </div>
                                    <button 
                                        onClick={handleCompra} 
                                        className="button button-blue buy-button"
                                    >
                                        Comprar
                                    </button>
                                </div>
                            </div>
                            
                            <div className="card stats-card">
                                <h3 className="card-title">Estadísticas</h3>
                                <div className="stats">
                                    <div className="stat">
                                        <span className="stat-label">Total de compras:</span>
                                        <span className="stat-value">{compras.length}</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-label">Completadas:</span>
                                        <span className="stat-value success">
                                            {compras.filter(c => c.estado === 'completada').length}
                                        </span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-label">Declinadas:</span>
                                        <span className="stat-value error">
                                            {compras.filter(c => c.estado === 'declinada').length}
                                        </span>
                                    </div>
                                    <div className="stat total-spent">
                                        <span className="stat-label">Gasto total:</span>
                                        <span className="stat-value">
                                            ${compras
                                                .filter(c => c.estado === 'completada')
                                                .reduce((sum, c) => sum + Number(c.valor), 0)
                                                .toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="payment-container">
                        <h3 className="payment-title">Datos de la compra</h3>
                        <div className="purchase-summary">
                            <p>Producto: <strong>{producto}</strong></p>
                            <p>Valor: <strong>${valor}</strong></p>
                        </div>
                        <Compra 
                            onCompraExitosa={finalizarCompra}
                            onCancelar={cancelarCompra}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardUser;
