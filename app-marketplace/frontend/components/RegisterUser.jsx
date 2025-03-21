import { useState } from 'react';
import axios from 'axios';

const RegisterUser = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/register', { correo, password, role: 'user' });
            alert("Usuario registrado. Ahora inicie sesión.");
            window.location.href = '/';
        } catch (err) {
            console.error(err.response.data);
            alert("Error en el registro.");
        }
    };

    return (
        <div>
            <h2>Registro de Usuario</h2>
            <input type="email" placeholder="Correo" onChange={(e) => setCorreo(e.target.value)} />
            <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Registrarse</button>
        </div>
    );
};

export default RegisterUser;
