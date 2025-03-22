import { useState } from 'react';
import axios from 'axios';

const RegisterAdmin = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/register', { correo, password, role: 'admin' });
            alert("Administrador registrado. Ahora inicie sesión.");
            window.location.href = '/';
        } catch (err) {
            console.error(err.response.data);
            alert("Error en el registro.");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2 className="title">Registro de Administrador</h2>
                <input 
                    type="email" 
                    placeholder="Correo" 
                    onChange={(e) => setCorreo(e.target.value)} 
                    className="input"
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="input"
                />
                <button 
                    onClick={handleRegister} 
                    className="button button-red"
                >
                    Registrarse
                </button>
            </div>
        </div>
    );
};

export default RegisterAdmin;