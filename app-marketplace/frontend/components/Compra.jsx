import { useState } from 'react';

const Compra = () => {
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tarjeta, setTarjeta] = useState('');
    const [fecha, setFecha] = useState('');
    const [ccv, setCcv] = useState('');

    const handlePago = () => {
        if (tarjeta === '9946 6854 2114 4000' && fecha === '06/28' && ccv === '986') {
            alert("Pago exitoso");
        } else {
            alert("Tarjeta inválida");
        }
    };

    return (
        <div>
            <h2>Información de Pago</h2>
            <input type="text" placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} />
            <input type="text" placeholder="Cédula" onChange={(e) => setCedula(e.target.value)} />
            <input type="text" placeholder="Teléfono" onChange={(e) => setTelefono(e.target.value)} />
            <input type="text" placeholder="Número de Tarjeta" onChange={(e) => setTarjeta(e.target.value)} />
            <input type="text" placeholder="Fecha de Vencimiento (MM/AA)" onChange={(e) => setFecha(e.target.value)} />
            <input type="text" placeholder="CCV" onChange={(e) => setCcv(e.target.value)} />
            <button onClick={handlePago}>Pagar</button>
        </div>
    );
};

export default Compra;
