import { useState, useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

const Compra = ({ onCompraExitosa, onCancelar }) => {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tarjeta, setTarjeta] = useState('');
    const [fecha, setFecha] = useState('');
    const [ccv, setCcv] = useState('');
    const [animating, setAnimating] = useState(false);

    const handlePago = () => {
        // Validar que todos los campos estén completos
        if (!nombre || !cedula || !telefono || !tarjeta || !fecha || !ccv) {
            alert("Por favor complete todos los campos");
            return;
        }

        // Determinar el estado de la compra según la validez de la tarjeta
        const tarjetaValida = tarjeta === '9946 6854 2114 4000' && fecha === '06/28' && ccv === '986';
        const estado = tarjetaValida ? 'completada' : 'declinada';
        
        // Animación de procesamiento
        setAnimating(true);
        
        // Simular procesamiento
        setTimeout(() => {
            setAnimating(false);
            
            // Llamar al callback con los datos de la compra
            onCompraExitosa({
                nombre,
                cedula,
                telefono,
                metodo_pago: 'tarjeta',
                estado: estado
            });
            
            // Informar al usuario sobre el resultado
            if (!tarjetaValida) {
                alert("Tarjeta inválida. La compra se ha registrado como declinada.");
            }
        }, 1500);
    };

    return (
        <div className={`payment-form ${darkMode ? 'dark' : ''}`}>
            <div className="theme-toggle">
                <button onClick={toggleTheme} className="theme-button">
                    {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
                </button>
            </div>
            
            <h2 className="title">Información de Pago</h2>
            
            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="nombre">Nombre Completo</label>
                    <input 
                        id="nombre"
                        type="text" 
                        placeholder="Nombre completo" 
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)} 
                        className="input"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="cedula">Cédula</label>
                    <input 
                        id="cedula"
                        type="text" 
                        placeholder="Número de cédula" 
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)} 
                        className="input"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input 
                        id="telefono"
                        type="text" 
                        placeholder="Número de teléfono" 
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)} 
                        className="input"
                    />
                </div>
                
                <div className="form-group card-group">
                    <label htmlFor="tarjeta">Número de Tarjeta</label>
                    <input 
                        id="tarjeta"
                        type="text" 
                        placeholder="9946 6854 2114 4000" 
                        value={tarjeta}
                        onChange={(e) => setTarjeta(e.target.value)} 
                        className="input"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="fecha">Fecha de Expiración</label>
                    <input 
                        id="fecha"
                        type="text" 
                        placeholder="MM/AA (06/28)" 
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)} 
                        className="input"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="ccv">CCV</label>
                    <input 
                        id="ccv"
                        type="text" 
                        placeholder="986" 
                        value={ccv}
                        onChange={(e) => setCcv(e.target.value)} 
                        className="input"
                    />
                </div>
            </div>
            
            <div className="button-group">
                <button 
                    onClick={handlePago} 
                    className={`button button-blue ${animating ? 'processing' : ''}`}
                    disabled={animating}
                >
                    {animating ? 'Procesando...' : 'Pagar'}
                </button>
                <button 
                    onClick={onCancelar} 
                    className="button button-red"
                    disabled={animating}
                >
                    Cancelar
                </button>
            </div>
            
            <div className="card-demo">
                <p>✨ Tarjeta de Prueba: 9946 6854 2114 4000 | Fecha: 06/28 | CCV: 986</p>
            </div>
        </div>
    );
};

export default Compra;
