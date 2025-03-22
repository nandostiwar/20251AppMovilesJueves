import { useState, useEffect, useContext } from 'react';
import ventaService from '../services/ventaService';
import ThemeContext from '../context/ThemeContext';
import authService from '../services/authService';

const DashboardAdmin = () => {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const [compras, setCompras] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState('todos');
    const [filtroUsuario, setFiltroUsuario] = useState('');
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    useEffect(() => {
        fetchCompras();
    }, []);

    const fetchCompras = async () => {
        setLoading(true);
        try {
            const data = await ventaService.getTodasLasCompras();
            setCompras(data);
        } catch (error) {
            alert('Error al obtener las compras: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const actualizarEstado = async (id, estado) => {
        setProcessingId(id);
        try {
            console.log(`Actualizando compra ${id} a estado ${estado}`);
            await ventaService.actualizarEstadoCompra(id, estado);
            await fetchCompras();
            alert(`Compra ${estado === 'completada' ? 'aceptada' : 'rechazada'} con éxito`);
        } catch (error) {
            alert('Error al actualizar el estado: ' + error.message);
        } finally {
            setProcessingId(null);
        }
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
                return { color: 'orange', fontWeight: 'bold' };
        }
    };

    // Filtrar las compras según los criterios
    const comprasFiltradas = compras.filter(c => {
        // Filtro por estado
        if (filtroEstado !== 'todos' && c.estado !== filtroEstado) {
            return false;
        }
        
        // Filtro por usuario (correo)
        if (filtroUsuario && !c.usuario?.correo?.toLowerCase().includes(filtroUsuario.toLowerCase())) {
            return false;
        }
        
        return true;
    });

    return (
        <div className={`app-container admin ${darkMode ? 'dark' : ''}`}>
            <div className="dashboard-header">
                <h1 className="dashboard-title">Panel de Administrador</h1>
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
                <div className="card admin-card">
                    <h2 className="card-title">Gestión de Compras</h2>
                    
                    {/* Filtros */}
                    <div className="filters">
                        <div className="filter-group">
                            <label htmlFor="filtroEstado">Filtrar por estado:</label>
                            <select 
                                id="filtroEstado"
                                value={filtroEstado}
                                onChange={(e) => setFiltroEstado(e.target.value)}
                                className="filter-input"
                            >
                                <option value="todos">Todos</option>
                                <option value="completada">Completada</option>
                                <option value="declinada">Declinada</option>
                            </select>
                        </div>
                        
                        <div className="filter-group">
                            <label htmlFor="filtroUsuario">Buscar usuario:</label>
                            <input 
                                id="filtroUsuario"
                                type="text" 
                                placeholder="Email del usuario"
                                value={filtroUsuario}
                                onChange={(e) => setFiltroUsuario(e.target.value)}
                                className="filter-input"
                            />
                        </div>
                        
                        <button onClick={fetchCompras} className="refresh-button">
                            🔄 Actualizar
                        </button>
                    </div>
                    
                    {/* Tabla de compras */}
                    {loading ? (
                        <div className="loading-spinner">Cargando...</div>
                    ) : (
                        <div className="table-container">
                            <table className="table admin-table">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Usuario</th>
                                        <th>Producto</th>
                                        <th>Valor</th>
                                        <th>Estado</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comprasFiltradas.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="empty-results">
                                                No se encontraron compras con estos criterios
                                            </td>
                                        </tr>
                                    ) : (
                                        comprasFiltradas.map((c) => (
                                            <tr key={c._id} className="purchase-row">
                                                <td>{new Date(c.fecha).toLocaleDateString()}</td>
                                                <td>
                                                    <div className="user-info">
                                                        <div className="user-email">{c.usuario?.correo}</div>
                                                        <div className="user-details">
                                                            {c.nombre ? `${c.nombre} - ${c.cedula}` : 'Sin datos personales'}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{c.producto}</td>
                                                <td>${c.valor}</td>
                                                <td style={getEstadoStyle(c.estado)}>
                                                    {c.estado === 'completada' ? 'Completada ✓' : 
                                                     c.estado === 'declinada' ? 'Declinada ✗' : c.estado}
                                                </td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button 
                                                            onClick={() => actualizarEstado(c._id, 'completada')} 
                                                            className="button button-green action-button"
                                                            disabled={c.estado === 'completada' || processingId === c._id}
                                                        >
                                                            {processingId === c._id ? '...' : 'Aceptar'}
                                                        </button>
                                                        <button 
                                                            onClick={() => actualizarEstado(c._id, 'declinada')} 
                                                            className="button button-red action-button"
                                                            disabled={c.estado === 'declinada' || processingId === c._id}
                                                        >
                                                            {processingId === c._id ? '...' : 'Rechazar'}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                    
                    {/* Resumen de compras */}
                    <div className="summary-grid">
                        <div className="summary-card totals-card">
                            <h3 className="summary-title">Totales</h3>
                            <div className="summary-content">
                                <div className="summary-item">
                                    <span className="summary-label">Total de compras:</span>
                                    <span className="summary-value">{compras.length}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Completadas:</span>
                                    <span className="summary-value success">
                                        {compras.filter(c => c.estado === 'completada').length}
                                    </span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Declinadas:</span>
                                    <span className="summary-value error">
                                        {compras.filter(c => c.estado === 'declinada').length}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="summary-card values-card">
                            <h3 className="summary-title">Valor Total</h3>
                            <div className="summary-content">
                                <div className="summary-item">
                                    <span className="summary-label">Aceptadas:</span>
                                    <span className="summary-value success">
                                        ${compras
                                            .filter(c => c.estado === 'completada')
                                            .reduce((sum, c) => sum + Number(c.valor || 0), 0)
                                            .toFixed(2)}
                                    </span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Declinadas:</span>
                                    <span className="summary-value error">
                                        ${compras
                                            .filter(c => c.estado === 'declinada')
                                            .reduce((sum, c) => sum + Number(c.valor || 0), 0)
                                            .toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
